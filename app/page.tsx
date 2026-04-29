"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Home() {
  const [prices, setPrices] = useState<any>({});

useEffect(() => {
  const fetchPrices = async () => {
    try {
      const res = await fetch("/api/prices");

      if (!res.ok) return; // prevents crash

      const data = await res.json();
      setPrices(data);

    } catch (err) {
      console.log("API error:", err);
    }
  };

  fetchPrices();
}, []);

  return (
    <main className="min-h-screen text-white relative pt-20">
      <Navbar />

      {/* 📡 LIVE TICKER */}
      <span>
  GBP/USD: {prices["GBP/USD"]?.price || "Loading..."}
</span>



      {/* 🔥 HERO */}
      <section className="px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-5xl font-bold leading-tight">
            Trade <span className="text-purple-400">Smart</span>, Not Hard
          </h1>

          <p className="mt-4 text-gray-400">
            Learn how to trade GBP/USD with structure, discipline and confidence.
          </p>

          <div className="mt-6 flex gap-4">
            <Link href="/mentorship">
              <button className="btn-primary">Join Mentorship</button>
            </Link>

            <Link href="/market">
              <button className="border px-4 py-2 rounded">
                View Market
              </button>
            </Link>
          </div>

          <p className="mt-6 text-green-400 animate-pulse">
            ● Live Market Active
          </p>
        </div>

        <div className="glass glow p-4 h-[400px]">
          <iframe
            src="https://s.tradingview.com/widgetembed/?symbol=FX:GBPUSD&theme=dark"
            className="w-full h-full"
          ></iframe>
        </div>
      </section>

      {/* WHY CHOOSE US */}
<div className="py-20 text-center">

  <h2 className="text-3xl font-bold mb-10">
    Why Choose LaughterX
  </h2>

  <div className="grid md:grid-cols-3 gap-6">

    <div className="glass p-6">
      <h3 className="font-bold mb-2">Accurate Signals</h3>
      <p className="text-gray-400">
        High probability setups with clear entries, TP & SL.
      </p>
    </div>

    <div className="glass p-6">
      <h3 className="font-bold mb-2">Beginner Friendly</h3>
      <p className="text-gray-400">
        Learn from scratch with structured mentorship.
      </p>
    </div>

    <div className="glass p-6">
      <h3 className="font-bold mb-2">Community Support</h3>
      <p className="text-gray-400">
        Stay connected and grow with other traders.
      </p>
    </div>

  </div>
</div>



      {/* ⚠️ DISCLAIMER */}
      <section className="px-6 py-6">
        <div className="bg-red-500/10 border border-red-500 text-red-400 p-6 rounded-xl text-center font-semibold">
          ⚠️ Trading Forex involves significant risk. You can lose money.  
          This mentorship does NOT guarantee profits.  
          You are fully responsible for your trading decisions.
        </div>
      </section>

      {/* 💎 FEATURES */}
      <section className="px-6 py-16 grid md:grid-cols-3 gap-6">

        <div className="glass p-6">
          <h3 className="font-bold">Live Trading</h3>
          <p className="text-gray-400 mt-2">
            See real trades executed step-by-step.
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="font-bold">Daily Signals</h3>
          <p className="text-gray-400 mt-2">
            Structured entries with TP & SL.
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="font-bold">Risk System</h3>
          <p className="text-gray-400 mt-2">
            Protect your capital like a pro.
          </p>
        </div>

      </section>

      {/* 💰 PRICING */}
      <div className="grid md:grid-cols-3 gap-6">

  <Link href="/mentorship">
    <div className="glass p-6 hover:scale-105 transition cursor-pointer">
      <h3 className="text-xl font-bold">Basic</h3>
      <p className="text-2xl mt-2">₦100,000</p>
      <p className="text-gray-400 mt-3">
        Duration: 1 Month  
        3 Sessions/Week  
        Forex Basics + Entry Strategy
      </p>
    </div>
  </Link>

  <Link href="/mentorship">
    <div className="glass glow-purple p-6 hover:scale-105 transition cursor-pointer">
      <h3 className="text-xl font-bold">Advanced</h3>
      <p className="text-2xl mt-2">₦190,000</p>
      <p className="text-gray-400 mt-3">
        Duration: 2 Months  
        3 Sessions/Week  
        Signals + Market Structure + Psychology
      </p>
    </div>
  </Link>

  <Link href="/mentorship">
    <div className="glass p-6 hover:scale-105 transition cursor-pointer">
      <h3 className="text-xl font-bold">VIP</h3>
      <p className="text-2xl mt-2">₦400,000</p>
      <p className="text-gray-400 mt-3">
        Duration: 3 Months  
        2 Sessions/Week  
        1-on-1 Mentorship + Full Access
      </p>
    </div>
  </Link>

</div>


      {/* 💬 TESTIMONIALS */}
      <section className="px-6 py-16 grid md:grid-cols-3 gap-6">

        <div className="glass p-6">
          <p>"I was losing before, now I'm consistent."</p>
          <p className="mt-4 text-gray-400 text-sm">— Daniel O., Lagos</p>
        </div>

        <div className="glass p-6">
          <p>"This made GBP/USD so easy to understand."</p>
          <p className="mt-4 text-gray-400 text-sm">— Sarah K., Lagos</p>
        </div>

        <div className="glass p-6">
          <p>"Best trading decision I made."</p>
          <p className="mt-4 text-gray-400 text-sm">— Michael T., Benin</p>
        </div>

      </section>

      {/* ❓ FAQ (UPGRADED) */}
      <section className="px-6 py-16 max-w-4xl mx-auto">

        <h2 className="text-3xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>

        {[
          {
            q: "Is this for beginners?",
            a: "Yes, everything is explained step-by-step from scratch."
          },
          {
            q: "Do you trade live?",
            a: "Yes, live sessions are part of the mentorship."
          },
          {
            q: "Can I lose money?",
            a: "Yes. Trading involves risk and losses are possible."
          },
          {
            q: "What pairs do you focus on?",
            a: "Mainly GBP/USD with additional pairs included."
          },
          {
            q: "How do I access signals?",
            a: "Through your dashboard after joining."
          },
          {
            q: "Is this one-time payment?",
            a: "Yes, depending on the plan you choose."
          },
          {
            q: "Do you offer refunds?",
            a: "No refunds once access is granted."
          },
          {
            q: "How long is the mentorship?",
            a: "Access duration depends on your plan."
          },
          {
            q: "Will I become profitable?",
            a: "Profitability depends on your discipline and consistency."
          },
          {
            q: "How do I join?",
            a: "Click any 'Join Mentorship' button and follow instructions."
          }
        ].map((item, i) => (
          <details key={i} className="glass p-4 mb-4 cursor-pointer">
            <summary className="font-semibold">{item.q}</summary>
            <p className="text-gray-400 mt-2">{item.a}</p>
          </details>
        ))}

      </section>

      {/* 🚀 CTA */}
      <section className="px-6 py-20 text-center">
        <h2 className="text-4xl font-bold">
          Start Trading Smarter Today
        </h2>

        <Link href="/mentorship">
          <button className="btn-primary mt-6">
            Join Mentorship Now
          </button>
        </Link>
      </section>

      {/* 🧾 FOOTER */}

      <footer className="w-full bg-black border-t border-gray-800 mt-20">

  <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10 text-gray-400">

    {/* BRAND */}
    <div>
      <h2 className="text-white text-xl font-bold mb-3">
        Laughter<span className="text-purple-400">X</span>
      </h2>

      <p>
        Smart trading signals and mentorship to help you grow consistently.
      </p>
    </div>

    {/* NAVIGATION */}
    <div>
      <h3 className="text-white font-semibold mb-3">Navigation</h3>

      <div className="flex flex-col gap-2">
        <a href="/">Home</a>
        <a href="/market">Market</a>
        <a href="/mentorship">Mentorship</a>
        <a href="/dashboard">Dashboard</a>
      </div>
    </div>

    {/* LEGAL */}
    <div>
      <h3 className="text-white font-semibold mb-3">Legal</h3>

      <div className="flex flex-col gap-2">
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms & Conditions</a>
        <a href="/risk">Risk Disclaimer</a>
      </div>
    </div>

    {/* CONTACT */}
    <div>
      <h3 className="text-white font-semibold mb-3">Contact</h3>

      <div className="flex flex-col gap-2">

        <a href="https://wa.me/2347017838958" target="_blank">
          WhatsApp
        </a>

        <a href="mailto:laughterexchange2@gmail.com">
          Email
        </a>

        <a href="https://twitter.com/laughterxchange" target="_blank">
          Twitter
        </a>

        <a href="https://instagram.com/laughter_thestrategist" target="_blank">
          Instagram
        </a>

      </div>
    </div>

  </div>

  {/* BOTTOM BAR */}
  <div className="border-t border-gray-800 text-center py-4 text-gray-500 text-sm">
    © 2026 LaughterX. All rights reserved.
  </div>

</footer>
      

      {/* 💬 FLOATING WHATSAPP */}
      <a
        href="https://wa.me/2347017838958"
        target="_blank"
        className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-lg hover:scale-110 transition"
      >
        💬
      </a>

    </main>
  );
}
