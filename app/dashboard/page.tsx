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

  // FORM STATES
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

  // ADD SIGNAL
  const addSignal = async () => {
    if (!pair || !entry || !tp || !sl) {
      alert("Fill all fields");
      return;
    }

    const { error } = await supabase.from("signals").insert([
      { pair, type, entry, tp, sl },
    ]);

    if (error) alert("Error adding signal");
    else {
      alert("Signal added!");
      resetForm();
    }
  };

  // UPDATE SIGNAL
  const updateSignal = async () => {
    if (!editingId) return;

    const { error } = await supabase
      .from("signals")
      .update({ pair, type, entry, tp, sl })
      .eq("id", editingId);

    if (error) alert("Error updating signal");
    else {
      alert("Updated!");
      resetForm();
    }
  };

  // DELETE SIGNAL
  const deleteSignal = async (id: string) => {
    const confirmDelete = confirm("Delete this signal?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("signals")
      .delete()
      .eq("id", id);

    if (error) alert("Error deleting");
    else alert("Deleted");
  };

  // START EDIT
  const startEdit = (signal: any) => {
    setEditingId(signal.id);
    setPair(signal.pair);
    setType(signal.type);
    setEntry(signal.entry);
    setTp(signal.tp);
    setSl(signal.sl);
  };

  // 🔐 LOAD USER + DATA
  useEffect(() => {
    const loadDashboard = async () => {

      const { data: auth } = await supabase.auth.getUser();

      // ❌ Not logged in
      if (!auth.user) {
        router.push("/login");
        return;
      }

      // 🔐 Get profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin, is_paid")
        .eq("id", auth.user.id)
        .single();

      setIsAdmin(profile?.is_admin || false);
      const isPaid = profile?.is_paid || false;

// ❌ Not paid → block access
if (!isPaid && !profile?.is_admin) {
  router.push("/payment");
  return;
}


      // 📡 Fetch signals
      const fetchSignals = async () => {
        const { data } = await supabase
          .from("signals")
          .select("*")
          .order("created_at", { ascending: false });

        setSignals(data || []);
        setLoading(false);
      };

      await fetchSignals();

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

  if (loading) {
    return <div className="text-white p-10">Loading dashboard...</div>;
  }

  return (
    <main className="min-h-screen dashboard-bg text-white">
      <Navbar />

      <div className="p-6">

        {/* HEADER */}
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Trading Dashboard</h1>
          <p className="text-green-400">● Live</p>
        </div>

        {/* ADMIN PANEL */}
        {isAdmin && (
          <div className="glass p-6 mb-10">

            <h2 className="font-bold mb-4">
              {editingId ? "Edit Signal" : "Post Signal"}
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <input placeholder="Pair" value={pair} onChange={(e) => setPair(e.target.value)} className="p-3 bg-black border rounded" />

              <select value={type} onChange={(e) => setType(e.target.value)} className="p-3 bg-black border rounded">
                <option>BUY</option>
                <option>SELL</option>
              </select>

              <input placeholder="Entry" value={entry} onChange={(e) => setEntry(e.target.value)} className="p-3 bg-black border rounded" />

              <input placeholder="TP" value={tp} onChange={(e) => setTp(e.target.value)} className="p-3 bg-black border rounded" />

              <input placeholder="SL" value={sl} onChange={(e) => setSl(e.target.value)} className="p-3 bg-black border rounded" />

            </div>

            <button
              onClick={editingId ? updateSignal : addSignal}
              className="btn-primary mt-4"
            >
              {editingId ? "Update Signal" : "Post Signal"}
            </button>

          </div>
        )}

        {/* SIGNALS */}
        <div>
          <h2 className="text-xl font-bold mb-4">Live Signals</h2>

          {signals.length === 0 && (
            <p className="text-gray-400">No signals yet</p>
          )}

          {signals.map((signal) => (
            <div key={signal.id} className="glass p-4 mb-4">

              <div className="flex justify-between">
                <p>{signal.pair}</p>
                <p className={signal.type === "BUY" ? "text-green-400" : "text-red-400"}>
                  {signal.type}
                </p>
              </div>

              <p className="text-sm text-gray-400">
                Entry: {signal.entry} | TP: {signal.tp} | SL: {signal.sl}
              </p>

              {isAdmin && (
                <div className="flex gap-4 mt-2 text-sm">
                  <button onClick={() => startEdit(signal)} className="text-blue-400">Edit</button>
                  <button onClick={() => deleteSignal(signal.id)} className="text-red-400">Delete</button>
                </div>
              )}

            </div>
          ))}

        </div>

      </div>
    </main>
  );
}
