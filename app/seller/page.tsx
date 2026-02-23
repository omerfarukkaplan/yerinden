"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SellerPanel() {
  const [form, setForm] = useState({
    address: "",
    phone: "",
    description: "",
  });

  async function save() {
    const { data: { user } } = await supabase.auth.getUser();

    await supabase
      .from("producers")
      .update(form)
      .eq("id", user?.id);
  }

  return (
    <div className="p-10 space-y-4">
      <input
        placeholder="Adres"
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />
      <input
        placeholder="Telefon"
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <textarea
        placeholder="Açıklama"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <button onClick={save} className="btn">
        Kaydet
      </button>
    </div>
  );
}