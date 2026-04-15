import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://api.twelvedata.com/price?symbol=GBP/USD&apikey=demo"
    );

    const data = await res.json();

    return NextResponse.json({
      "GBP/USD": data
    });

  } catch (error) {
    return NextResponse.json({
      "GBP/USD": { price: "1.2700" } // fallback
    });
  }
}
