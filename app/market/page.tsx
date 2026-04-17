"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function Market() {

  const [prices, setPrices] = useState<any>({});

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch("/api/prices");

        if (!res.ok) return;

        const data = await res.json();
        setPrices(data);

      } catch (err) {
        console.log("Error fetching prices:", err);
      }
    };

    fetchPrices();

    const interval = setInterval(fetchPrices, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen text-white pt-20">
      <Navbar />

      {/* HEADER */}
      <div className="px-6 py-10">
        <h1 className="text-3xl font-bold">
          Live Market Dashboard
        </h1>

        <p className="text-gray-400 mt-2">
          Real-time forex prices updating automatically
        </p>
      </div>

      {/* LIVE PAIRS */}
      <div className="px-6 grid md:grid-cols-4 gap-6">

        {["GBP/USD", "EUR/USD", "USD/JPY"].map((pair, i) => {
          const price = prices[pair]?.price;

          return (
            <div
              key={i}
              className="glass p-4 hover:scale-105 transition"
            >
              <p className="font-bold">{pair}</p>

              <p className="text-green-400 text-lg mt-2">
                {price ? price : "Loading..."}
              </p>
            </div>
          );
        })}

      </div>

      {/* CHART */}
      <div className="px-6 mt-10">
        <div className="glass p-4 h-[450px]">

          <iframe
            src="https://s.tradingview.com/widgetembed/?symbol=FX:GBPUSD&theme=dark"
            className="w-full h-full"
          ></iframe>

        </div>
      </div>

      {/* EXTRA INFO */}
      <div className="px-6 py-16 grid md:grid-cols-3 gap-6">

        <div className="glass p-6">
          <h3 className="font-bold">Market Analysis</h3>
          <p className="text-gray-400 mt-2">
            Weekly breakdown of forex market direction.
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="font-bold">Volatility</h3>
          <p className="text-gray-400 mt-2">
            Understand price spikes and movements.
          </p>
        </div>

        <div className="glass p-6">
          <h3 className="font-bold">Liquidity Zones</h3>
          <p className="text-gray-400 mt-2">
            Identify smart money positions.
          </p>
        </div>

      </div>

    </main>
  );
}
