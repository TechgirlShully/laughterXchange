"use client";

import Navbar from "@/components/Navbar";

export default function Mentorship() {
  return (
    <main className="min-h-screen text-white pt-20">
      <Navbar />

      {/* HERO */}
      <section className="px-6 py-16 text-center pt-20">
        <h1 className="text-4xl font-bold">
          Join The LaughterXchange Mentorship
        </h1>
        <p className="text-gray-400 mt-4">
          Learn Forex the right way — no guessing, no gambling.
        </p>
      </section>

      {/* PLANS */}
      <section className="px-6 py-10 grid md:grid-cols-3 gap-6">

        {/* BASIC */}
        <div className="glass p-6">
          <h2 className="text-xl font-bold">Basic Plan</h2>
          <p className="text-2xl mt-2">₦100,000</p>

          <ul className="mt-4 text-gray-400 space-y-2">
            <li>• Duration: 1 Month</li>
            <li>• 3 Sessions per week</li>
            <li>• Forex Basics</li>
            <li>• Entry Strategies</li>
            <li>• Risk Management</li>
          </ul>

          <a
            href="https://wa.me/2347017838958?text=I want to join Basic Plan"
            target="_blank"
          >
            <button className="btn-primary mt-6 w-full">
              Join via WhatsApp
            </button>
          </a>
        </div>

        {/* ADVANCED */}
        <div className="glass glow-purple p-6">
          <h2 className="text-xl font-bold">Advanced Plan</h2>
          <p className="text-2xl mt-2">₦190,000</p>

          <ul className="mt-4 text-gray-400 space-y-2">
            <li>• Duration: 2 Months</li>
            <li>• 3 Sessions per week</li>
            <li>• Trade Signals</li>
            <li>• Market Structure</li>
            <li>• Psychology Training</li>
          </ul>

          <a
            href="https://wa.me/2347017838958?text=I want to join Advanced Plan"
            target="_blank"
          >
            <button className="btn-primary mt-6 w-full">
              Join via WhatsApp
            </button>
          </a>
        </div>

        {/* VIP */}
        <div className="glass p-6">
          <h2 className="text-xl font-bold">VIP Plan</h2>
          <p className="text-2xl mt-2">₦400,000</p>

          <ul className="mt-4 text-gray-400 space-y-2">
            <li>• Duration: 3 Months</li>
            <li>• 2 Sessions per week</li>
            <li>• 1-on-1 Mentorship</li>
            <li>• Full Signals Access</li>
            <li>• Personal Guidance</li>
          </ul>

          <a
            href="https://wa.me/2347017838958?text=I want to join VIP Plan"
            target="_blank"
          >
            <button className="btn-primary mt-6 w-full">
              Join via WhatsApp
            </button>
          </a>
        </div>

      </section>

      {/* EXTRA DETAILS */}
      <section className="px-6 py-16 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold">What You Will Learn</h2>

        <p className="text-gray-400 mt-4">
          Market structure, liquidity, entries, risk control, discipline,
          and how to trade like professionals.
        </p>
      </section>

      {/* WARNING */}
      <section className="px-6 py-10">
        <div className="bg-red-500/10 border border-red-500 text-red-400 p-6 rounded-xl text-center">
          ⚠️ Trading involves risk. You can lose money.  
          This mentorship does NOT guarantee profits.
        </div>
      </section>

    </main>
  );
}
