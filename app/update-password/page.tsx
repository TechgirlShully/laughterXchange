"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");

  const updatePassword = async () => {
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Password updated successfully");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center login-bg text-white">

      <div className="glass p-8">

        <h1 className="text-xl mb-4">Set New Password</h1>

        <input
          type="password"
          placeholder="New password"
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 bg-black border rounded w-full"
        />

        <button
          onClick={updatePassword}
          className="btn-primary mt-4 w-full"
        >
          Update Password
        </button>

      </div>
    </main>
  );
}
