"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-purple-900 to-black text-white">

      <Navbar />

      <div className="glass p-8 w-full max-w-md">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Welcome Back
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 bg-black border rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 bg-black border rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login} className="btn-primary w-full">
          Login
        </button>

      </div>

    </main>
  );
}
