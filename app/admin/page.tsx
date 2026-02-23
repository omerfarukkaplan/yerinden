"use client";

import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Admin() {
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    fetchListings();
  }, []);

  async function fetchListings() {
    const { data } = await supabase.from("listings").select("*");
    setListings(data || []);
  }

  async function sponsor(id: string) {
    await supabase
      .from("listings")
      .update({ is_sponsored: true })
      .eq("id", id);

    fetchListings();
  }

  return (
    <div className="p-8">
      {listings.map((l) => (
        <div key={l.id} className="flex justify-between border p-3 mb-2">
          <span>{l.title}</span>
          <button
            onClick={() => sponsor(l.id)}
            className="bg-yellow-400 px-3 py-1 rounded"
          >
            Sponsor Yap
          </button>
        </div>
      ))}
    </div>
  );
}