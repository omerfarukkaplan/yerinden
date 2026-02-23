"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function SellerListings() {
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      const { data } = await supabase
        .from("listings")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      setListings(data || []);
    };

    load();
  }, []);

  const boostListing = (id: string) => {
    window.Paddle.Checkout.open({
      items: [
        {
          priceId: process.env.NEXT_PUBLIC_PADDLE_BOOST_PRICE_ID!,
          quantity: 1,
        },
      ],
      customData: {
        listing_id: id,
      },
    });
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-6">İlanlarım</h1>

      {listings.map((item) => {
        const isBoosted =
          item.boost_until &&
          new Date(item.boost_until) > new Date();

        return (
          <div key={item.id} className="bg-white p-6 shadow mb-4 flex justify-between">
            <div>
              <h2>{item.title}</h2>
              <p>{item.views} görüntülenme</p>
            </div>

            {!isBoosted && (
              <button
                onClick={() => boostListing(item.id)}
                className="bg-purple-600 text-white px-4 py-2"
              >
                🔥 Boost (199 TL)
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}