import Navbar from "@/components/Navbar";

export default function Market() {
  return (
    <main className="text-white">
      <Navbar />

      <div className="p-6">
        <h1>Market</h1>

        <div className="h-[400px] mt-6">
          <iframe
            src="https://s.tradingview.com/widgetembed/?symbol=FX:GBPUSD&theme=dark"
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </main>
  );
}
