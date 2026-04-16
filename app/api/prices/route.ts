import { NextResponse } from "next/server";

export async function GET() {
  try {
    const symbols = ["GBP/USD", "EUR/USD", "USD/JPY"];

    const results: any = {};

    for (const symbol of symbols) {
      const res = await fetch(
        `https://api.twelvedata.com/price?symbol=${symbol}&apikey=demo`
      );

      const data = await res.json();
      results[symbol] = data;
    }

    return NextResponse.json(results);

  } catch (error) {
    return NextResponse.json({
      "GBP/USD": { price: "1.2700" },
      "EUR/USD": { price: "1.0800" },
      "USD/JPY": { price: "149.00" },
    });
  }
}

