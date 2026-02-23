"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function ListingDetail({ params }: any) {
  const [listing, setListing] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("listings")
        .select("*")
        .eq("id", params.id)
        .single();

      setListing(data);

      await supabase.rpc("increment_views", {
        listing_id: params.id,
      });
    };

    load();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("listing-view")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "listings" },
        (payload) => {
          if (payload.new.id === params.id) {
            setListing(payload.new);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (!listing) return <div>Yükleniyor...</div>;

  const isBoosted =
    listing.boost_until &&
    new Date(listing.boost_until) > new Date();

  return (
    <div className="max-w-4xl mx-auto p-10">
      {isBoosted && (
        <span className="bg-purple-600 text-white px-3 py-1 text-sm rounded">
          🔥 BOOST
        </span>
      )}

      <img
        src={listing.image_url}
        className="w-full h-96 object-cover my-4"
      />

      <h1 className="text-3xl font-bold">{listing.title}</h1>
      <p className="text-xl mt-2">{listing.price} TL</p>

      <p className="mt-4 text-gray-600">
        {listing.views} görüntülenme
      </p>
    </div>
  );
}