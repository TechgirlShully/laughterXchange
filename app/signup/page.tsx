"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function Signup() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    // 🔐 CREATE USER + SAVE NAME IN METADATA
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      alert(error.message);
      return;
    }

    // 🧠 CREATE PROFILE (SAFE INSERT)
    if (data.user) {
      await supabase.from("profiles").upsert({
        id: data.user.id,
        full_name: name,
        is_paid: false,
        is_admin: false,
      });
    }

    alert("Signup successful! You can now login.");
    router.push("/login");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <Navbar />

      <div className="glass p-8 w-full max-w-md">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 mb-4 bg-black border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 bg-black border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 bg-black border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={signup} className="btn-primary w-full">
          Sign Up
        </button>

      </div>
    </main>
  );
}
