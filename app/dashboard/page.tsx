"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [signals, setSignals] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      const { data: auth } = await supabase.auth.getUser();

      if (!auth.user) {
        router.push("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, is_paid, is_admin")
        .eq("id", auth.user.id)
        .single();

      // BLOCK UNPAID USERS (ADMIN CAN PASS)
      if (!profile?.is_admin && !profile?.is_paid) {
        router.push("/payment");
        return;
      }

      setUserData({
        name: profile?.full_name || "User",
        email: auth.user.email,
        isPaid: profile?.is_paid,
        isAdmin: profile?.is_admin,
      });

      const { data } = await supabase
        .from("signals")
        .select("*")
        .order("created_at", { ascending: false });

      setSignals(data || []);
      setLoading(false);
    };

    loadDashboard();
  }, [router]);

  if (loading) {
    return <div className="text-white p-10">Loading...</div>;
  }

  return (
    <main className="min-h-screen dashboard-bg text-white">
      <Navbar />

      <div className="p-6 space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>

          {userData.isAdmin && (
            <span className="text-purple-400">Admin</span>
          )}
        </div>

        {/* PROFILE CARD */}
        <div className="glass p-6 flex justify-between items-center">

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

          {/* AVATAR */}
          <div className="w-14 h-14 rounded-full bg-purple-500 flex items-center justify-center text-lg font-bold">
            {userData.name?.charAt(0)}
          </div>

        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="glass p-5 text-center">
            <p className="text-gray-400 text-sm">Total Signals</p>
            <h3 className="text-xl font-bold">
              {signals.length}
            </h3>
          </div>

          <div className="glass p-5 text-center">
            <p className="text-gray-400 text-sm">Account Type</p>
            <h3 className="text-xl font-bold">
              {userData.isAdmin
                ? "Admin"
                : userData.isPaid
                ? "Premium"
                : "Free"}
            </h3>
          </div>

          <div className="glass p-5 text-center">
            <p className="text-gray-400 text-sm">Access</p>
            <h3 className="text-xl font-bold">
              {userData.isPaid || userData.isAdmin
                ? "Unlocked"
                : "Locked"}
            </h3>
          </div>

        </div>

        {/* QUICK ACTIONS */}
<div className="grid md:grid-cols-2 gap-6">

  <a href="/market" className="glass p-6 text-center hover:scale-105">
    View Market
  </a>

  <a href="/mentorship" className="glass p-6 text-center hover:scale-105">
    Join Mentorship
  </a>

</div>


        {/* ACTION SECTION */}
        {!userData.isPaid && !userData.isAdmin && (
          <div className="glass p-6 text-center">
            <p className="mb-4">
              Upgrade to access full signals
            </p>

            <a href="/payment" className="btn-primary">
              Upgrade Now
            </a>
          </div>
        )}

        {/* SIGNALS */}
        <div>
          <h2 className="text-xl font-bold mb-4">
            Live Signals
          </h2>

          {signals.map((signal) => (
            <div
              key={signal.id}
              className="glass p-4 mb-4 hover:scale-[1.02] transition"
            >
              <div className="flex justify-between">
                <p>{signal.pair}</p>
                <p className={signal.type === "BUY" ? "text-green-400" : "text-red-400"}>
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
