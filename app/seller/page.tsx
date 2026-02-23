"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SellerPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [form, setForm] = useState<any>({
    city_slug: "",
    category_slug: "",
    address: "",
    phone: "",
    description: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    }
    load();
  }, []);

  async function saveProfile() {
    if (!userId) return;

    await supabase
      .from("producers")
      .update(form)
      .eq("id", userId);

    alert("Profil kaydedildi");
  }

  function getLocation() {
    navigator.geolocation.getCurrentPosition((pos) => {
      setForm({
        ...form,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    });
  }

  return (
    <div className="max-w-3xl space-y-6">

      <h2 className="text-2xl font-bold text-green-600">
        Profil Bilgileri
      </h2>

      <select
        className="border p-3 rounded w-full"
        onChange={(e) => setForm({ ...form, city_slug: e.target.value })}
      >
        <option>Şehir Seç</option>
        <option value="istanbul">İstanbul</option>
        <option value="ankara">Ankara</option>
        <option value="izmir">İzmir</option>
      </select>

      <select
        className="border p-3 rounded w-full"
        onChange={(e) => setForm({ ...form, category_slug: e.target.value })}
      >
        <option>Kategori Seç</option>
        <option value="koy-yumurtasi">Köy Yumurtası</option>
        <option value="dogal-bal">Doğal Bal</option>
      </select>

      <input
        className="border p-3 rounded w-full"
        placeholder="Adres"
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />

      <input
        className="border p-3 rounded w-full"
        placeholder="Telefon"
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <textarea
        className="border p-3 rounded w-full"
        placeholder="Açıklama"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <button
        onClick={getLocation}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Konumumu Al
      </button>

      <button
        onClick={saveProfile}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Kaydet
      </button>

    </div>
  );
}