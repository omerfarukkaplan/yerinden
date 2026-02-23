"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useParams } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Detail() {
  const { id } = useParams();
  const [listing, setListing] = useState<any>(null);

  useEffect(() => {
    fetchListing();
    supabase.rpc("increment_view", { listing_id: id });
  }, []);

  async function fetchListing() {
    const { data } = await supabase
      .from("listings")
      .select("*, producers(phone)")
      .eq("id", id)
      .single();

    setListing(data);
  }

  if (!listing) return null;

  return (
    <div className="max-w-5xl mx-auto p-8">
      <img
        src={listing.images?.[0]}
        className="w-full h-96 object-cover rounded-xl"
      />

      <h1 className="text-3xl font-bold mt-6">{listing.title}</h1>
      <p className="text-xl text-green-600 font-bold">
        {listing.price} TL
      </p>

      <p className="mt-4">{listing.description}</p>

      <a
        href={`https://wa.me/${listing.producers.phone}`}
        target="_blank"
        className="mt-6 inline-block bg-green-500 text-white px-6 py-3 rounded-lg"
      >
        WhatsApp ile İletişime Geç
      </a>
    </div>
  );
}