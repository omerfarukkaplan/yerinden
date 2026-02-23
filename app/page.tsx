"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Filters from "./components/Filters";
import ListingCard from "./components/ListingCard";

export default function HomePage() {
  const [listings, setListings] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadListings = async () => {
    setLoading(true);

    let query = supabase
      .from("listings")
      .select("*")
      .order("boost_until", { ascending: false })
      .order("is_featured", { ascending: false })
      .order("created_at", { ascending: false });

    if (search) {
      query = query.textSearch("search_vector", search);
    }

    const { data } = await query;
    setListings(data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadListings();
  }, [search]);

  return (
    <div>
      <Filters search={search} setSearch={setSearch} />

      {loading && <p>Yükleniyor...</p>}

      {!loading && listings.length === 0 && (
        <p className="text-center text-gray-500">
          Henüz ilan yok.
        </p>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {listings.map((item) => (
          <ListingCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}