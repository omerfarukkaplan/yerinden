"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import ListingCard from "./components/ListingCard";

export default function HomePage() {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("listings")
        .select("*")
        .order("boost_until", { ascending: false })
        .order("is_featured", { ascending: false })
        .order("created_at", { ascending: false });

      setListings(data || []);
      setLoading(false);
    };

    load();
  }, []);

  return (
    <div>

      {/* HERO */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Türkiye'nin Yeni Nesil İlan Platformu
        </h1>
        <p className="text-gray-600 mb-6">
          Premium satıcılar, boost sistemi ve gelişmiş filtreleme.
        </p>
      </div>

      {/* LOADING */}
      {loading && <p>Yükleniyor...</p>}

      {/* BOŞ */}
      {!loading && listings.length === 0 && (
        <div className="text-center text-gray-500">
          Henüz ilan yok.
        </div>
      )}

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-6">
        {listings.map((item) => (
          <ListingCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}