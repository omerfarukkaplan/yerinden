"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { useRouter } from "next/navigation";

export default function UpgradePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSeller = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push("/login");

      const { data } = await supabase
        .from("profiles")
        .select("role, plan")
        .eq("id", user.id)
        .single();

      if (data?.role !== "seller") {
        router.push("/");
      }

      if (data?.plan === "premium") {
        router.push("/seller");
      }

      setLoading(false);
    };

    checkSeller();
  }, []);

  if (loading) return <div>Yükleniyor...</div>;

  const openCheckout = () => {
    window.Paddle.Checkout.open({
      items: [
        {
          priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_ID,
          quantity: 1,
        },
      ],
      customData: {
        user_id: localStorage.getItem("user_id"),
      },
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border p-10 text-center w-96">
        <h1 className="text-2xl font-bold mb-6">Premium Üyelik</h1>
        <p className="text-3xl font-bold mb-6">1299 TL</p>

        <button
          onClick={openCheckout}
          className="bg-green-600 text-white px-6 py-3 w-full"
        >
          Premium Ol
        </button>
      </div>
    </div>
  );
}