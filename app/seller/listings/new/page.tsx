"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabase";
import { useRouter } from "next/navigation";

export default function NewListingPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push("/login");

      const { data: profile } = await supabase
        .from("profiles")
        .select("plan")
        .eq("id", user.id)
        .single();

      if (profile?.plan !== "premium") {
        router.push("/seller/upgrade");
      }
    };

    checkAccess();
  }, []);

  const handleSubmit = async () => {
    if (!file) return alert("Fotoğraf zorunlu");

    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();

    // Upload image
    const fileName = `${user?.id}-${Date.now()}.jpg`;

    const { error: uploadError } = await supabase.storage
      .from("listings")
      .upload(fileName, file);

    if (uploadError) {
      alert(uploadError.message);
      return;
    }

    const { data: publicUrl } = supabase.storage
      .from("listings")
      .getPublicUrl(fileName);

    // Insert listing
    await supabase.from("listings").insert({
      user_id: user?.id,
      title,
      price: Number(price),
      image_url: publicUrl.publicUrl,
      is_featured: true,
    });

    setLoading(false);
    router.push("/seller");
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 shadow">
      <h1 className="text-2xl font-bold mb-6">Yeni İlan</h1>

      <input
        placeholder="Başlık"
        className="border p-3 w-full mb-4"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        placeholder="Fiyat"
        className="border p-3 w-full mb-4"
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        type="file"
        className="mb-4"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-green-600 text-white py-3 w-full"
      >
        {loading ? "Yükleniyor..." : "Yayınla"}
      </button>
    </div>
  );
}