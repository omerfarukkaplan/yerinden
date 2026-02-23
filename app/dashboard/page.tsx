"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Producer = {
  id: string;
  premium_type: string;
  premium_until: string | null;
};

export default function Dashboard() {
  const [producer, setProducer] = useState<Producer | null>(null);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("producers")
        .select("id, premium_type, premium_until")
        .eq("id", user.id)
        .single();

      setProducer(data);
    }

    load();
  }, []);

  function buy(plan: string) {
    if (!producer) return;

    window.Paddle?.Checkout.open({
      items: [{ priceId: plan, quantity: 1 }],
      customData: {
        producer_id: producer.id,
        plan,
      },
    });
  }

  return (
    <div className="p-12 max-w-5xl mx-auto space-y-10">

      <h2 className="text-3xl font-bold text-green-600">
        Premium Yükselt
      </h2>

      {producer && (
        <div className="border p-6 rounded-lg bg-green-50">
          <p>
            Plan: <strong>{producer.premium_type}</strong>
          </p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-8">

        {/* BASIC */}
        <div className="border p-6 rounded-lg hover:shadow-lg transition">
          <h3 className="text-xl font-bold">Basic</h3>
          <p className="text-2xl font-bold mt-2">499 TL</p>
          <button
            className="mt-4 w-full bg-gray-800 text-white py-2 rounded"
            onClick={() => buy(process.env.NEXT_PUBLIC_PADDLE_BASIC!)}
          >
            Başla
          </button>
        </div>

        {/* PRO */}
        <div className="border-2 border-green-500 p-6 rounded-lg bg-green-50 shadow-lg">
          <h3 className="text-xl font-bold">Pro</h3>
          <p className="text-2xl font-bold mt-2">999 TL</p>
          <button
            className="mt-4 w-full bg-green-600 text-white py-2 rounded"
            onClick={() => buy(process.env.NEXT_PUBLIC_PADDLE_PRO!)}
          >
            Premium Ol
          </button>
        </div>

        {/* GOLD */}
        <div className="border p-6 rounded-lg hover:shadow-lg transition">
          <h3 className="text-xl font-bold">Gold</h3>
          <p className="text-2xl font-bold mt-2">1399 TL</p>
          <button
            className="mt-4 w-full bg-pink-600 text-white py-2 rounded"
            onClick={() => buy(process.env.NEXT_PUBLIC_PADDLE_GOLD!)}
          >
            En Üste Çık
          </button>
        </div>

      </div>
    </div>
  );
}