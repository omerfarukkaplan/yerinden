"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function IlanPage() {
  const [listings, setListings] = useState<any[]>([]);
  const [city, setCity] = useState("");
  const [minPrice, setMinPrice] = useState("");

  useEffect(() => {
    async function load() {
      let query = supabase
        .from("listings")
        .select(`
          *,
          producers ( premium_type, city_slug )
        `)
        .order("is_sponsored", { ascending: false });

      if (city) query = query.eq("producers.city_slug", city);
      if (minPrice) query = query.gte("price", Number(minPrice));

      const { data } = await query;
      setListings(data || []);
    }

    load();
  }, [city, minPrice]);

  return (
    <div className="flex p-10 gap-10">

      {/* SIDEBAR */}
      <aside className="w-64 space-y-6 border p-6 rounded-xl bg-white shadow">

        <h3 className="font-bold text-lg">Filtrele</h3>

        <select
          className="border p-2 rounded w-full"
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">Şehir</option>
          <option value="istanbul">İstanbul</option>
          <option value="ankara">Ankara</option>
        </select>

        <input
          type="number"
          placeholder="Min Fiyat"
          className="border p-2 rounded w-full"
          onChange={(e) => setMinPrice(e.target.value)}
        />
      </aside>

      {/* GRID */}
      <div className="grid grid-cols-3 gap-6 flex-1">

        {listings.map((item) => {
          const premium = item.producers?.premium_type;

          return (
            <Link href={`/ilan/${item.id}`} key={item.id}>
              <div
                className={`
                  border rounded-xl overflow-hidden shadow transition
                  hover:shadow-xl
                  ${item.is_sponsored ? "ring-2 ring-yellow-400 shadow-yellow-300" : ""}
                `}
              >
                {item.images?.[0] && (
                  <img
                    src={item.images[0]}
                    className="h-48 w-full object-cover"
                  />
                )}

                <div className="p-4 space-y-2">
                  <h3 className="font-bold">{item.title}</h3>

                  <p className="text-green-600 font-bold">
                    {item.price} TL
                  </p>

                  {item.is_sponsored && (
                    <span className="text-xs bg-yellow-400 px-2 py-1 rounded">
                      Sponsorlu
                    </span>
                  )}

                  {premium === "gold" && (
                    <span className="text-xs bg-pink-500 text-white px-2 py-1 rounded">
                      GOLD
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}

      </div>
    </div>
  );
}