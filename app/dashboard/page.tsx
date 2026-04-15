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
      const { data: auth } = await supabase.auth.getUser();

      // ❌ Not logged in
      if (!auth.user) {
        router.push("/login");
        return;
      }

      // ✅ Get user profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", auth.user.id)
        .single();

      // ❌ Not paid
      

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
    <main className="min-h-screen text-white">
      <Navbar />
    <div className="p-6">

  <h1 className="text-2xl font-bold mb-6">
    Trading Terminal
  </h1>

  {/* TOP STATS */}
  <div className="grid md:grid-cols-4 gap-6">

    <div className="glass p-5">
      Balance: $1,250
    </div>

    <div className="glass p-5">
      Profit: +12%
    </div>

    <div className="glass p-5">
      Trades: 24
    </div>

    <div className="glass p-5">
      Win Rate: 82%
    </div>

  </div>

  {/* CHART */}
  <div className="glass mt-10 p-4 h-[400px]">
    <iframe
      src="https://s.tradingview.com/widgetembed/?symbol=FX:GBPUSD&theme=dark"
      className="w-full h-full"
    ></iframe>
  </div>

  {/* SIGNALS */}
  <div className="mt-10">
    <h2 className="text-xl mb-4">Live Signals</h2>

    {signals.map((signal) => (
      <div key={signal.id} className="glass p-4 mb-4">

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

        <p className="text-gray-400 text-sm">
          Entry: {signal.entry} | TP: {signal.tp} | SL: {signal.sl}
        </p>

      </div>
    ))}
  </div>

</div>
    </main>
  );
}
