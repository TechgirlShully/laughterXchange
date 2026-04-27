"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [signals, setSignals] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>(null);

  // FORM STATES (ADMIN)
  const [pair, setPair] = useState("");
  const [type, setType] = useState("BUY");
  const [entry, setEntry] = useState("");
  const [tp, setTp] = useState("");
  const [sl, setSl] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // RESET FORM
  const resetForm = () => {
    setPair("");
    setEntry("");
    setTp("");
    setSl("");
    setEditingId(null);
  };

  // 📡 FETCH SIGNALS
  const fetchSignals = async () => {
    const { data } = await supabase
      .from("signals")
      .select("*")
      .order("created_at", { ascending: false });

    setSignals(data || []);
  };

  // 👤 FETCH USERS (ADMIN)
  const fetchUsers = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*");

    setUsers(data || []);
  };

  // 🔐 LOAD DASHBOARD
  useEffect(() => {
    const loadDashboard = async () => {

      const { data: auth } = await supabase.auth.getUser();

      // ❌ NOT LOGGED IN
      if (!auth.user) {
        router.push("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, is_admin, is_paid")
        .eq("id", auth.user.id)
        .single();

      const isAdminUser = profile?.is_admin === true;
      const isPaidUser = profile?.is_paid === true;

      setIsAdmin(isAdminUser);

      // SAVE USER DATA
      setUserData({
        name: profile?.full_name || "No Name",
        email: auth.user.email,
        isAdmin: isAdminUser,
        isPaid: isPaidUser,
      });

      // ❌ BLOCK UNPAID USERS (ADMIN BYPASS)
      if (!isAdminUser && !isPaidUser) {
        router.push("/payment");
        return;
      }

      // LOAD DATA
      await fetchSignals();

      if (isAdminUser) {
        await fetchUsers();
      }

      setLoading(false);

      // 🔥 REALTIME
      const channel = supabase
        .channel("signals-channel")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "signals",
          },
          () => {
            fetchSignals();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    };

    loadDashboard();
  }, [router]);

  // ➕ ADD SIGNAL
  const addSignal = async () => {
    if (!pair || !entry || !tp || !sl) {
      alert("Fill all fields");
      return;
    }

    await supabase.from("signals").insert([
      { pair, type, entry, tp, sl },
    ]);

    alert("Signal added!");
    resetForm();
    fetchSignals();
  };

  // ✏️ UPDATE SIGNAL
  const updateSignal = async () => {
    if (!editingId) return;

    await supabase
      .from("signals")
      .update({ pair, type, entry, tp, sl })
      .eq("id", editingId);

    alert("Updated!");
    resetForm();
    fetchSignals();
  };

  // ❌ DELETE SIGNAL
  const deleteSignal = async (id: string) => {
    if (!confirm("Delete this signal?")) return;

    await supabase
      .from("signals")
      .delete()
      .eq("id", id);

    alert("Deleted");
    fetchSignals();
  };

  // ✏️ START EDIT
  const startEdit = (signal: any) => {
    setEditingId(signal.id);
    setPair(signal.pair);
    setType(signal.type);
    setEntry(signal.entry);
    setTp(signal.tp);
    setSl(signal.sl);
  };

  // 💰 APPROVE PAYMENT
  const approvePayment = async (id: string) => {
    await supabase
      .from("profiles")
      .update({ is_paid: true })
      .eq("id", id);

    fetchUsers();
  };

  const totalSignals = signals.length;

  // ⏳ LOADING
  if (loading) {
    return <div className="text-white p-10">Loading dashboard...</div>;
  }

  return (
    <main className="min-h-screen dashboard-bg text-white">
      <Navbar />

      <div className="p-6">

        {/* HEADER */}
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">
            {isAdmin ? "Admin Dashboard" : "User Dashboard"}
          </h1>
          <p className="text-green-400 animate-pulse">● Live</p>
        </div>

        {/* USER PROFILE CARD */}
        {userData && (
          <div className="glass p-6 mb-6 flex flex-col md:flex-row justify-between gap-6">

            <div>
              <h2 className="text-xl font-bold">
                {userData.name}
              </h2>

              <p className="text-gray-400">
                {userData.email}
              </p>

              <p className="mt-2">
                Status:{" "}
                {userData.isAdmin ? (
                  <span className="text-purple-400">Admin</span>
                ) : userData.isPaid ? (
                  <span className="text-green-400">Active</span>
                ) : (
                  <span className="text-red-400">Free</span>
                )}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">

              <div className="glass p-4 text-center">
                <p className="text-gray-400 text-sm">Signals</p>
                <h3 className="text-lg font-bold">{totalSignals}</h3>
              </div>

              <div className="glass p-4 text-center">
                <p className="text-gray-400 text-sm">Access</p>
                <h3 className="text-lg font-bold">
                  {userData.isPaid || userData.isAdmin ? "Full" : "Limited"}
                </h3>
              </div>

            </div>

          </div>
        )}

        {/* ================= ADMIN SECTION ================= */}
        {isAdmin && (
          <>
            {/* SIGNAL CONTROL */}
            <div className="glass p-6 mb-10">

              <h2 className="font-bold mb-4">
                {editingId ? "Edit Signal" : "Post Signal"}
              </h2>

              <div className="grid md:grid-cols-2 gap-4">

                <input
                  placeholder="Pair"
                  value={pair}
                  onChange={(e) => setPair(e.target.value)}
                  className="p-3 bg-black border rounded"
                />

                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="p-3 bg-black border rounded"
                >
                  <option>BUY</option>
                  <option>SELL</option>
                </select>

                <input
                  placeholder="Entry"
                  value={entry}
                  onChange={(e) => setEntry(e.target.value)}
                  className="p-3 bg-black border rounded"
                />

                <input
                  placeholder="TP"
                  value={tp}
                  onChange={(e) => setTp(e.target.value)}
                  className="p-3 bg-black border rounded"
                />

                <input
                  placeholder="SL"
                  value={sl}
                  onChange={(e) => setSl(e.target.value)}
                  className="p-3 bg-black border rounded"
                />

              </div>

              <button
                onClick={editingId ? updateSignal : addSignal}
                className="btn-primary mt-4"
              >
                {editingId ? "Update Signal" : "Post Signal"}
              </button>

            </div>

            {/* USER PAYMENTS */}
            <div className="glass p-6 mb-10">
              <h2 className="font-bold mb-4">User Payments</h2>

              {users.map((user) => (
                <div key={user.id} className="flex justify-between mb-2">

                  <div>
                    <p className="font-semibold">
                      {user.full_name || "No Name"}
                    </p>
                  </div>

                  {user.is_paid ? (
                    <span className="text-green-400">Paid</span>
                  ) : (
                    <button
                      onClick={() => approvePayment(user.id)}
                      className="text-blue-400"
                    >
                      Mark as Paid
                    </button>
                  )}

                </div>
              ))}
            </div>
          </>
        )}

        {/* ================= USER SIGNALS ================= */}
        <div>
          <h2 className="text-xl font-bold mb-4">Live Signals</h2>

          {signals.length === 0 && (
            <p className="text-gray-400">No signals yet</p>
          )}

          {signals.map((signal) => (
            <div
              key={signal.id}
              className="glass p-4 mb-4 hover:scale-[1.02] transition"
            >

              <div className="flex justify-between">
                <p>{signal.pair}</p>

                <p
                  className={
                    signal.type === "BUY"
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {signal.type}
                </p>
              </div>

              <p className="text-sm text-gray-400 mt-2">
                Entry: {signal.entry} | TP: {signal.tp} | SL: {signal.sl}
              </p>

              {isAdmin && (
                <div className="flex gap-4 mt-2 text-sm">
                  <button
                    onClick={() => startEdit(signal)}
                    className="text-blue-400"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteSignal(signal.id)}
                    className="text-red-400"
                  >
                    Delete
                  </button>
                </div>
              )}

            </div>
          ))}

        </div>

      </div>
    </main>
  );
}
