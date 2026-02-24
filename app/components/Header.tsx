"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user);
        supabase
          .from("profiles")
          .select("*")
          .eq("id", data.user.id)
          .single()
          .then(({ data }) => setProfile(data));
      }
    });
  }, []);

  return (
    <header className="flex justify-between p-4 border-b">
      <Link href="/" className="text-2xl font-bold text-green-600">
        Yerinden
      </Link>

      <div className="flex gap-4 items-center">
        {profile?.is_premium && (
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">
            PREMIUM
          </span>
        )}

        {user ? (
          <>
            <span>{user.email}</span>
            <Link href="/seller">Panel</Link>
            <button onClick={() => supabase.auth.signOut()}>
              Çıkış
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Giriş</Link>
            <Link href="/register">Kayıt</Link>
          </>
        )}
      </div>
    </header>
  );
}