"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 backdrop-blur-md">

      {/* LOGO */}
      <h1 className="text-xl font-bold tracking-wide">
        Laughter<span className="text-purple-400">X</span>
      </h1>

      {/* LINKS */}
      <div className="hidden md:flex gap-8 text-sm text-gray-300">
        <Link href="/" className="hover:text-white transition">Home</Link>
        <Link href="/market" className="hover:text-white transition">Market</Link>
        <Link href="/mentorship" className="hover:text-white transition">Mentorship</Link>
        <Link href="/dashboard" className="hover:text-white transition">Dashboard</Link>
      </div>

      {/* CTA */}
      <Link href="/signup">
        <button className="btn-primary">
          Join Now
        </button>
      </Link>

    </div>
  );
}
