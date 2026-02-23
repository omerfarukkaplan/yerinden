"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function IlanPage() {
  const params = useSearchParams();
  const city = params.get("city");
  const category = params.get("category");

  const [data, setData] = useState([]);

  useEffect(() => {
    async function load() {
      let query = supabase.from("producers").select("*");

      if (city) query = query.eq("city_slug", city);
      if (category) query = query.eq("category_slug", category);

      const { data } = await query;
      setData(data || []);
    }

    load();
  }, [city, category]);

  return (
    <div className="p-10 space-y-6">
      {data.map((p: any) => (
        <div key={p.id} className="card">
          <h3>{p.name}</h3>
          <p>{p.address}</p>
          <p>{p.phone}</p>
        </div>
      ))}
    </div>
  );
}