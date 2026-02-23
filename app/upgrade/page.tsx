"use client";

import { supabase } from "../../lib/supabase";

export default function UpgradePage() {

  const handleUpgrade = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    window.Paddle.Checkout.open({
      items: [
        {
          priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_ID!,
          quantity: 1,
        },
      ],
      customData: {
        user_id: user.id,
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-10 rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold mb-6">
          Premium Üyelik – 1299 TL
        </h1>

        <button
          onClick={handleUpgrade}
          className="bg-purple-600 px-6 py-3 rounded-lg hover:bg-purple-700"
        >
          Premium’a Geç
        </button>
      </div>
    </div>
  );
}