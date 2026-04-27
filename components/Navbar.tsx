"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-black/80 backdrop-blur-md border-b border-gray-800 fixed top-0 left-0 z-50">

      <div className="flex justify-between items-center px-6 py-4">

        {/* LOGO */}
      <h1 className="text-xl font-bold tracking-wide">
        Laughter<span className="text-purple-400">X</span>
      </h1>

      {/* CTA */}
      <Link href="/login">
        <button className="btn-primary">
          Login
        </button>
      </Link>


        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-6 text-white">
          <Link href="/">Home</Link>
          <Link href="/market">Market</Link>
          <Link href="/mentorship">Mentorship</Link>
          <Link href="/dashboard">Dashboard</Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-4 text-white bg-black">

          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/market" onClick={() => setOpen(false)}>Market</Link>
          <Link href="/mentorship" onClick={() => setOpen(false)}>Mentorship</Link>
          <Link href="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>

        </div>
      )}

      
    </nav>
  );
}