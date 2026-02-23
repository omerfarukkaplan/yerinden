"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";

export default function HomePage() {
  const [listings, setListings] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const loadListings = async () => {
    const { data } = await supabase
      .from("listings")
      .select("*")
      .textSearch("search_vector", search)
      .order("boost_until", { ascending: false })
      .order("is_featured", { ascending: false })
      .order("created_at", { ascending: false });

    setListings(data || []);
  };

  useEffect(() => {
    loadListings();
  }, [search]);

  return (
    <div className="p-10">
      <input
        placeholder="İlan ara..."
        className="border p-3 mb-6 w-full"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid md:grid-cols-3 gap-6">
        {listings.map((item) => {
          const isBoosted =
            item.boost_until &&
            new Date(item.boost_until) > new Date();

          return (
            <Link
              href={`/ilan/${item.id}`}
              key={item.id}
              className="bg-white shadow p-4 relative"
            >
              {isBoosted && (
                <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                  🔥 BOOST
                </span>
              )}

              <img
                src={item.image_url}
                className="h-48 w-full object-cover mb-4"
              />

              <h2>{item.title}</h2>
              <p>{item.price} TL</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}