"use client";

import { useEffect } from "react";

export default function Dashboard() {

  // Paddle initialize
  useEffect(() => {
    if (typeof window !== "undefined" && window.Paddle) {
      window.Paddle.Initialize({
        token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
      });
    }
  }, []);

  function buy(plan: string) {
    if (typeof window !== "undefined" && window.Paddle) {
      window.Paddle.Checkout.open({
        items: [
          {
            priceId: plan,
            quantity: 1,
          },
        ],
      });
    } else {
      console.error("Paddle not loaded");
    }
  }

  return (
    <div className="p-12 max-w-5xl mx-auto space-y-10">

      <h2 className="text-4xl font-bold neon-text">
        Premium Yükselt
      </h2>

      {/* Conversion artıran üst mesaj */}
      <div className="card border border-neonPink/40">
        <h3 className="text-xl font-bold mb-2">
          🚀 Bu ay 1.248 kişi Premium’a geçti
        </h3>
        <p className="text-gray-400">
          Premium üreticiler 5 kat daha fazla WhatsApp tıklaması alıyor.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-8">

        {/* BASIC */}
        <div className="card">
          <h3 className="text-2xl font-bold">Basic</h3>
          <p className="text-3xl font-bold mt-2">990 TL</p>
          <ul className="mt-4 space-y-2 text-sm text-gray-300">
            <li>✔ Üst sıralarda görünme</li>
            <li>✔ WhatsApp butonu</li>
          </ul>
          <button
            className="btn mt-6 w-full"
            onClick={() => buy(process.env.NEXT_PUBLIC_PADDLE_BASIC!)}
          >
            Hemen Başla
          </button>
        </div>

        {/* PRO (Highlight) */}
        <div className="card border-2 border-neon shadow-[0_0_25px_#00f5ff] scale-105">
          <div className="text-center text-neonGreen font-bold mb-2">
            EN POPÜLER
          </div>
          <h3 className="text-2xl font-bold">Pro</h3>
          <p className="text-3xl font-bold mt-2">1490 TL</p>
          <ul className="mt-4 space-y-2 text-sm text-gray-300">
            <li>✔ İlk 5’te görünme</li>
            <li>✔ Premium rozeti</li>
            <li>✔ 5x görünürlük</li>
          </ul>
          <button
            className="btn mt-6 w-full"
            onClick={() => buy(process.env.NEXT_PUBLIC_PADDLE_PRO!)}
          >
            Premium Ol
          </button>
        </div>

        {/* GOLD */}
        <div className="card border border-neonPink shadow-[0_0_25px_#ff00ff]">
          <h3 className="text-2xl font-bold">Gold</h3>
          <p className="text-3xl font-bold mt-2">2990 TL</p>
          <ul className="mt-4 space-y-2 text-sm text-gray-300">
            <li>✔ Ana sayfa banner</li>
            <li>✔ En üst sabit konum</li>
            <li>✔ Özel video alanı</li>
          </ul>
          <button
            className="btn mt-6 w-full"
            onClick={() => buy(process.env.NEXT_PUBLIC_PADDLE_GOLD!)}
          >
            En Üste Çık
          </button>
        </div>

      </div>
    </div>
  );
}