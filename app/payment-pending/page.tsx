

export default function Pending() {
  return (
    <main className="min-h-screen text-white">
      <Navbar />

      <div className="flex flex-col items-center justify-center mt-20 text-center">
        <h1 className="text-3xl font-bold">Access Pending</h1>

        <p className="text-gray-400 mt-4">
          Your payment is being reviewed.
          <br />
          Contact admin on WhatsApp for activation.
        </p>

        <a
          href="https://wa.me/2347017838958"
          className="btn-primary mt-6"
        >
          Contact Admin
        </a>
      </div>
    </main>
  );
}
