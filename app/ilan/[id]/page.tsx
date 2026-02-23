"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useParams } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DetailPage() {
  const { id } = useParams();
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("listings")
        .select(`
          *,
          producers ( phone, address )
        `)
        .eq("id", id)
        .single();

      setItem(data);
    }
    load();
  }, [id]);

  if (!item) return null;

  return (
    <div className="p-10 space-y-6 max-w-4xl mx-auto">

      <div className="grid grid-cols-2 gap-6">
        {item.images?.map((img: string, i: number) => (
          <img key={i} src={img} className="rounded-xl" />
        ))}
      </div>

      <h1 className="text-3xl font-bold">{item.title}</h1>

      <p className="text-xl text-green-600 font-bold">
        {item.price} TL
      </p>

      <p>{item.description}</p>

      <div className="border p-6 rounded-xl bg-gray-50">
        <p><strong>Adres:</strong> {item.producers.address}</p>
        <p><strong>Telefon:</strong> {item.producers.phone}</p>
      </div>

    </div>
  );
}