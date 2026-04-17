"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [signals, setSignals] = useState<any[]>([]);

  useEffect(() => {
    const checkAccess = async () => {
      //const { data: auth } = await supabase.auth.getUser();

      // ❌ Not logged in
     // if (!auth.user) {
      //  router.push("/login");
       // return;
     // }

      
      // ❌ Not paid
      //if (!profile?.is_paid) {
        //router.push("/payment-pending");
       // return;
      //}


      // ✅ Fetch signals
      const { data: signalData } = await supabase
        .from("signals")
        .select("*")
        .order("created_at", { ascending: false });

      setSignals(signalData || []);
      setLoading(false);
    };

    checkAccess();
  }, [router]);

  // ⏳ Loading screen
  if (loading) {
    return (
      <div className="text-white p-10">
        Checking access...
      </div>
    );
  }

  return (
    <main className="min-h-screen dashboard-bg text-white pt-20">
  <Navbar />

  <div className="p-6">

    {/* HEADER */}
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">
        Trading Terminal
      </h1>

      <p className="text-green-400 animate-pulse">
        ● Live
      </p>
    </div>

    {/* STATS */}
    <div className="grid md:grid-cols-4 gap-6">

      <div className="glass p-5 glow-purple">
        <p className="text-gray-400 text-sm">Balance</p>
        <h2 className="text-xl">$1,250</h2>
      </div>

      <div className="glass p-5">
        <p className="text-gray-400 text-sm">Profit</p>
        <h2 className="text-green-400">+12%</h2>
      </div>

      <div className="glass p-5">
        <p className="text-gray-400 text-sm">Trades</p>
        <h2>24</h2>
      </div>

      <div className="glass p-5">
        <p className="text-gray-400 text-sm">Win Rate</p>
        <h2>82%</h2>
      </div>

    </div>

    {/* CHART */}
    <div className="glass mt-10 p-4 h-[400px] glow-blue">
      <iframe
        src="https://s.tradingview.com/widgetembed/?symbol=FX:GBPUSD&theme=dark"
        className="w-full h-full"
      ></iframe>
    </div>

    {/* SIGNALS */}
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4">
        Live Signals
      </h2>

      {signals.map((signal) => (
        <div key={signal.id} className="glass p-4 mb-4 hover:scale-[1.02] transition">

          <div className="flex justify-between">
            <p>{signal.pair}</p>

            <p className={
              signal.type === "BUY"
                ? "text-green-400"
                : "text-red-400"
            }>
              {signal.type}
            </p>
          </div>

          <p className="text-gray-400 text-sm mt-2">
            Entry: {signal.entry} | TP: {signal.tp} | SL: {signal.sl}
          </p>

        </div>
      ))}

    </div>

  </div>
</main>

  );
}
