"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {

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

  // ADD SIGNAL
  const addSignal = async () => {
    if (!pair || !entry || !tp || !sl) {
      alert("Fill all fields");
      return;
    }

    const { error } = await supabase.from("signals").insert([
      { pair, type, entry, tp, sl },
    ]);

    if (error) {
      alert("Error adding signal");
    } else {
      alert("Signal added!");
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

    if (error) {
      alert("Error deleting signal");
    } else {
      alert("Deleted successfully");
    }
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

  // UPDATE SIGNAL
  const updateSignal = async () => {
    if (!editingId) return;

    const { error } = await supabase
      .from("signals")
      .update({ pair, type, entry, tp, sl })
      .eq("id", editingId);

    if (error) {
      alert("Error updating signal");
    } else {
      alert("Updated successfully");
      resetForm();
    }
  };

  // RESET FORM
  const resetForm = () => {
    setPair("");
    setEntry("");
    setTp("");
    setSl("");
    setEditingId(null);
  };

  // FETCH + REALTIME
  useEffect(() => {
  const loadDashboard = async () => {

    // 🔐 Get current user
    const { data: auth } = await supabase.auth.getUser();

    if (!auth.user) {
      window.location.href = "/login";
      return;
    }

    // 🔐 Get profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", auth.user.id)
      .single();

    // ✅ Set admin access
    setIsAdmin(profile?.is_admin || false);

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
}, []);

  // LOADING
  if (loading) {
    return <div className="text-white p-10">Loading dashboard...</div>;
  }

  return (
    <main className="min-h-screen dashboard-bg text-white">
      <Navbar />

      <div className="p-6">

        {/* LIVE TICKER */}
        <div className="flex gap-10 overflow-x-auto text-green-400 text-sm mb-6">
          <p>GBP/USD</p>
          <p>EUR/USD</p>
          <p>USD/JPY</p>
          <p>XAU/USD</p>
        </div>

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Trading Terminal</h1>
          <p className="text-green-400 animate-pulse">● Live Market</p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-4 gap-6">

          <div className="glass p-5 glow-purple">
            <p className="text-gray-400 text-sm">Account Balance</p>
            <h2 className="text-xl">$1,250</h2>
          </div>

          <div className="glass p-5">
            <p className="text-gray-400 text-sm">Total Profit</p>
            <h2 className="text-green-400">+12%</h2>
          </div>

          <div className="glass p-5">
            <p className="text-gray-400 text-sm">Trades Taken</p>
            <h2>24</h2>
          </div>

          <div className="glass p-5">
            <p className="text-gray-400 text-sm">Win Rate</p>
            <h2>75%</h2>
          </div>

        </div>

        {/* CHART + ACTIVITY */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="md:col-span-2 glass p-4 h-[400px] glow-blue">
            <iframe
              src="https://s.tradingview.com/widgetembed/?symbol=FX:GBPUSD&theme=dark"
              className="w-full h-full"
            ></iframe>
          </div>

          <div className="glass p-4">
            <h3 className="font-bold mb-4">Recent Activity</h3>

            <div className="space-y-3 text-sm text-gray-400">
              <p>✔ Signal posted</p>
              <p>✔ Market active</p>
              <p>✔ Trade analysis updated</p>
              <p>✔ System running</p>
            </div>
          </div>

        </div>

        {/* ADMIN PANEL */}
        {isAdmin && (
          <div className="glass p-6 mt-10">

            <h2 className="text-xl font-bold mb-4">
              {editingId ? "Edit Signal" : "Post Signal"}
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <input
                placeholder="Pair (GBP/USD)"
                value={pair}
                onChange={(e) => setPair(e.target.value)}
                className="p-3 bg-black border border-gray-700 rounded"
              />

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="p-3 bg-black border border-gray-700 rounded"
              >
                <option>BUY</option>
                <option>SELL</option>
              </select>

              <input
                placeholder="Entry"
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                className="p-3 bg-black border border-gray-700 rounded"
              />

              <input
                placeholder="Take Profit"
                value={tp}
                onChange={(e) => setTp(e.target.value)}
                className="p-3 bg-black border border-gray-700 rounded"
              />

              <input
                placeholder="Stop Loss"
                value={sl}
                onChange={(e) => setSl(e.target.value)}
                className="p-3 bg-black border border-gray-700 rounded"
              />

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
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">Live Signals</h2>

          {signals.length === 0 && (
            <p className="text-gray-400">No signals yet</p>
          )}

          {signals.map((signal) => (
            <div
              key={signal.id}
              className="glass p-4 mb-4 animate-fadeIn"
            >

              <div className="flex justify-between items-center">
                <p className="font-bold">{signal.pair}</p>

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

              <p className="text-gray-400 text-sm mt-2">
                Entry: {signal.entry} | TP: {signal.tp} | SL: {signal.sl}
              </p>

              {isAdmin && (
                <div className="flex gap-4 mt-3 text-sm">

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
