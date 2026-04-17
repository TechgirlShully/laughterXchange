"use client";

import Navbar from "@/components/Navbar";

export default function PaymentPending() {
  return (
    <main className="min-h-screen text-white pt-20">
      <Navbar />

      <div className="flex flex-col items-center justify-center h-[70vh] text-center px-6">
        <h1 className="text-3xl font-bold mb-4">
          Payment Pending
        </h1>

        <p className="text-gray-400 max-w-md">
          Your payment is being reviewed. Once confirmed, you will get full access to the dashboard.
        </p>

        <a
          href="https://wa.me/234XXXXXXXXXX"
          target="_blank"
          className="mt-6 btn-primary"
        >
          Contact Support
        </a>
      </div>
    </main>
  );
}
