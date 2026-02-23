"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ListingsPage() {
  const [listings, setListings] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("new");

  const limit = 12;

  useEffect(() => {
    fetchListings();
  }, [page, sort]);

  async function fetchListings() {
    let query = supabase
      .from("listings")
      .select("*")
      .eq("status", "active")
      .range((page - 1) * limit, page * limit - 1);

    if (sort === "price_low")
      query = query.order("price", { ascending: true });
    else if (sort === "price_high")
      query = query.order("price", { ascending: false });
    else
      query = query.order("is_sponsored", { ascending: false })
                   .order("created_at", { ascending: false });

    const { data } = await query;
    setListings(data || []);
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* SORT */}
      <div className="flex justify-between mb-6">
        <select
          className="border p-2 rounded"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="new">En Yeni</option>
          <option value="price_low">Fiyat Artan</option>
          <option value="price_high">Fiyat Azalan</option>
        </select>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-4 gap-6">
        {listings.map((item) => (
          <Link key={item.id} href={`/ilan/${item.id}`}>
            <div
              className={`border rounded-xl overflow-hidden shadow hover:shadow-lg transition ${
                item.is_sponsored ? "ring-2 ring-yellow-400 shadow-yellow-200" : ""
              }`}
            >
              <img
                src={item.images?.[0]}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-green-600 font-bold">
                  {item.price} TL
                </p>
                {item.is_sponsored && (
                  <span className="text-xs text-yellow-600 font-semibold">
                    Sponsorlu
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-4 mt-8">
        <button onClick={() => setPage(page - 1)}>Önceki</button>
        <button onClick={() => setPage(page + 1)}>Sonraki</button>
      </div>
    </div>
  );
}