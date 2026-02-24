"use client";

export default function Plan() {
  async function buyPremium() {
    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({ type: "premium" })
    });

    const data = await res.json();
    window.location.href = data.url;
  }

  return (
    <div className="max-w-md mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold">Premium Plan</h1>

      <div className="border p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold">1499 TL / Ay</h2>
        <ul className="mt-4 space-y-2 text-sm">
          <li>✔ Üst sıralama</li>
          <li>✔ Premium badge</li>
          <li>✔ Boost satın alabilme</li>
        </ul>

        <button
          onClick={buyPremium}
          className="mt-6 w-full bg-green-600 text-white py-2 rounded"
        >
          Premium Ol
        </button>
      </div>
    </div>
  );
}