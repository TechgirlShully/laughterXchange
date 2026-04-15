"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Admin() {
  const [pair, setPair] = useState("");

  const createSignal = async () => {
    await supabase.from("signals").insert({
      pair,
      type: "BUY",
      entry: "1.2000",
      tp: "1.2100",
      sl: "1.1900",
    });
  };

  return (
    <div className="p-10 text-white">
      <input onChange={(e) => setPair(e.target.value)} />
      <button onClick={createSignal}>Post Signal</button>
    </div>
  );
}

            