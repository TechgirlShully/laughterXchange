"use client";

export default function PaymentPage() {
  return (
    <main className="min-h-screen flex items-center justify-center text-white p-6">

      <div className="glass p-8 text-center max-w-md">

        <h1 className="text-2xl font-bold mb-4">
          Complete Your Payment
        </h1>

        <p className="text-gray-400 mb-6">
          You need to join the mentorship to access the dashboard.
        </p>

        <a
          href="https://wa.me/2347017838958"
          target="_blank"
          className="btn-primary"
        >
          Contact on WhatsApp
        </a>

      </div>

    </main>
  );
}
