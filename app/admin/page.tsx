"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Admin() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [signals, setSignals] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  // FORM
  const [pair, setPair] = useState("");
  const [type, setType] = useState("BUY");
  const [entry, setEntry] = useState("");
  const [tp, setTp] = useState("");
  const [sl, setSl] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // 🔐 PROTECT ADMIN
  useEffect(() => {
    const loadAdmin = async () => {
      const { data: auth } = await supabase.auth.getUser();

      if (!auth.user) {
        router.push("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", auth.user.id)
        .single();

      if (!profile?.is_admin) {
        router.push("/dashboard");
        return;
      }

      fetchSignals();
      fetchUsers();
      setLoading(false);
    };

    loadAdmin();
  }, [router]);

  const fetchSignals = async () => {
    const { data } = await supabase
      .from("signals")
      .select("*")
      .order("created_at", { ascending: false });

    setSignals(data || []);
  };

  const fetchUsers = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*");

    setUsers(data || []);
  };

  // ADD / UPDATE / DELETE
  const addSignal = async () => {
    await supabase.from("signals").insert([{ pair, type, entry, tp, sl }]);
    fetchSignals();
  };

  const updateSignal = async () => {
    await supabase
      .from("signals")
      .update({ pair, type, entry, tp, sl })
      .eq("id", editingId);
    setEditingId(null);
    fetchSignals();
  };

  const deleteSignal = async (id: string) => {
    await supabase.from("signals").delete().eq("id", id);
    fetchSignals();
  };

  const startEdit = (s: any) => {
    setEditingId(s.id);
    setPair(s.pair);
    setType(s.type);
    setEntry(s.entry);
    setTp(s.tp);
    setSl(s.sl);
  };

  const approvePayment = async (id: string) => {
    await supabase
      .from("profiles")
      .update({ is_paid: true })
      .eq("id", id);

    fetchUsers();
  };

  if (loading) {
    return <div className="text-white p-10">Loading...</div>;
  }

  return (
    <main className="min-h-screen dashboard-bg text-white">
      <Navbar />

      <div className="p-6">

        <h1 className="text-2xl font-bold mb-6">
          Admin Panel
        </h1>

        {/* SIGNAL FORM */}
        <div className="glass p-6 mb-10">

          <h2 className="font-bold mb-4">
            {editingId ? "Edit Signal" : "Post Signal"}
          </h2>

          <input placeholder="Pair" onChange={(e) => setPair(e.target.value)} className="p-2 mb-2 bg-black border" />
          <select onChange={(e) => setType(e.target.value)} className="p-2 mb-2 bg-black border">
            <option>BUY</option>
            <option>SELL</option>
          </select>
          <input placeholder="Entry" onChange={(e) => setEntry(e.target.value)} className="p-2 mb-2 bg-black border" />
          <input placeholder="TP" onChange={(e) => setTp(e.target.value)} className="p-2 mb-2 bg-black border" />
          <input placeholder="SL" onChange={(e) => setSl(e.target.value)} className="p-2 mb-2 bg-black border" />

          <button onClick={editingId ? updateSignal : addSignal} className="btn-primary">
            {editingId ? "Update" : "Post"}
          </button>

        </div>

        {/* USERS */}
        <div className="glass p-6">
          <h2 className="font-bold mb-4">Users</h2>

          {users.map((user) => (
            <div key={user.id} className="flex justify-between mb-2">

              <p>{user.full_name || "No Name"}</p>

              {user.is_paid ? (
                <span className="text-green-400">Paid</span>
              ) : (
                <button onClick={() => approvePayment(user.id)} className="text-blue-400">
                  Approve
                </button>
              )}

            </div>
          ))}

        </div>

      </div>
    </main>
  );
}
