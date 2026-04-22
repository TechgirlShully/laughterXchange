"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // If login fails → try signup
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        alert(signUpError.message);
      } else {
        alert("Account created! You can now login.");
      }
    } else {
      router.push("/dashboard");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center login-bg text-white px-6">

      {/* CARD */}
      <div className="glass w-full max-w-md p-8">

        <h1 className="text-3xl font-bold mb-2 text-center">
          Welcome Back
        </h1>

        <p className="text-gray-400 text-center mb-6">
          Login or create your account
        </p>

        {/* INPUTS */}
        <div className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-black border border-gray-700 rounded focus:outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-black border border-gray-700 rounded focus:outline-none"
          />

        </div>

        {/* BUTTON */}
        <button
          onClick={handleAuth}
          disabled={loading}
          className="btn-primary w-full mt-6"
        >
          {loading ? "Processing..." : "Login / Sign Up"}
        </button>

        {/* FOOTER */}
        <p className="text-gray-500 text-sm text-center mt-6">
          Access your trading dashboard
        </p>

      </div>
    </main>
  );
}
