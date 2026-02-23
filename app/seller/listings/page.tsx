"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ListingsPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [premium, setPremium] = useState<string>("free");
  const [images, setImages] = useState<File[]>([]);
  const [form, setForm] = useState<any>({
    title: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setUserId(user.id);

      const { data } = await supabase
        .from("producers")
        .select("premium_type")
        .eq("id", user.id)
        .single();

      setPremium(data?.premium_type || "free");
    }
    load();
  }, []);

  function handleDrop(e: any) {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setImages(files as File[]);
  }

  async function resizeImage(file: File) {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);

    await new Promise((r) => (img.onload = r));

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    canvas.width = 800;
    canvas.height = 600;
    ctx.drawImage(img, 0, 0, 800, 600);

    return new Promise<File>((resolve) => {
      canvas.toBlob((blob) => {
        resolve(new File([blob!], file.name));
      }, "image/jpeg", 0.8);
    });
  }

  async function addListing() {
    if (!userId) return;

    const maxPhotos = premium === "gold" ? 5 : 1;

    if (images.length > maxPhotos) {
      alert(`En fazla ${maxPhotos} foto yükleyebilirsiniz.`);
      return;
    }

    let imageUrls: string[] = [];

    for (const file of images) {
      const resized = await resizeImage(file);
      const path = `${userId}/${Date.now()}-${file.name}`;

      await supabase.storage
        .from("listing-images")
        .upload(path, resized);

      const { data } = supabase.storage
        .from("listing-images")
        .getPublicUrl(path);

      imageUrls.push(data.publicUrl);
    }

    await supabase.from("listings").insert({
      ...form,
      images: imageUrls,
      producer_id: userId,
      is_sponsored: premium === "gold",
    });

    alert("İlan eklendi");
  }

  return (
    <div className="space-y-6">

      <input
        placeholder="Başlık"
        className="border p-3 rounded w-full"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        placeholder="Açıklama"
        className="border p-3 rounded w-full"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        type="number"
        placeholder="Fiyat"
        className="border p-3 rounded w-full"
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-dashed border-2 p-10 text-center rounded"
      >
        Fotoğrafları sürükle bırak
      </div>

      <button
        onClick={addListing}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        İlan Ekle
      </button>

    </div>
  );
}