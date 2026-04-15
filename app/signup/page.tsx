"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    const { data } = await supabase.auth.signUp({
      email,
      password,
    });

    if (data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        email,
        is_paid: false,
        is_admin: false,
      });
    }

    router.push("/login");
  };

  return (
    <div className="p-10 text-white">
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={signup}>Signup</button>
    </div>
  );
}
