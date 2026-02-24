"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function NewListing() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  async function handleUpload() {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) return;

    const { data: profile } = await supabase
      .from("profiles")
      .select("is_premium")
      .eq("id", user.id)
      .single();

    if (!profile?.is_premium) {
      alert("Premium olmadan ilan veremezsin.");
      return;
    }

    let imageUrls: string[] = [];

    for (const file of files) {
      const fileName = `${Date.now()}-${file.name}`;

      const { data, error } = await supabase.storage
        .from("giyim-listings")
        .upload(fileName, file);

      if (!error) {
        imageUrls.push(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/giyim-listings/${fileName}`
        );
      }
    }

    await supabase.from("listings").insert({
      user_id: user.id,
      title,
      price,
      image_urls: imageUrls,
      is_active: true
    });

    router.push("/seller/listings");
  }

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-bold">Yeni İlan</h1>

      <input
        className="border p-2 w-full"
        placeholder="Başlık"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="Fiyat"
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        type="file"
        multiple
        onChange={(e) =>
          setFiles(Array.from(e.target.files || []))
        }
      />

      <button
        onClick={handleUpload}
        className="bg-green-600 text-white px-4 py-2"
      >
        Yayınla
      </button>
    </div>
  );
}