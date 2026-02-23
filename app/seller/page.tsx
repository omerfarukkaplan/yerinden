"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function SellerDashboard() {
  const [profile, setProfile] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push("/login");

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(data);
    };

    loadProfile();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Satıcı Paneli</h1>

      <p>Plan: {profile.plan}</p>
      <p>Bitiş: {profile.plan_expires_at || "Yok"}</p>

      {profile.plan !== "premium" && (
        <button
          onClick={() => router.push("/upgrade")}
          className="bg-black text-white px-4 py-2 mt-4"
        >
          Premium'a Geç
        </button>
      )}

      {profile.plan === "premium" && (
        <button
          onClick={() => router.push("/seller/listings/new")}
          className="bg-green-600 text-white px-4 py-2 mt-4"
        >
          Yeni İlan Ver
        </button>
      )}
    </div>
  );
}