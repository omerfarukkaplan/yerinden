"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        setProfile(data);
      }
    };

    loadUser();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link href="/" className="text-2xl font-bold text-green-600">
          Yerinden
        </Link>

        <nav className="flex items-center gap-6 text-sm">

          <Link href="/">Ana Sayfa</Link>

          {profile?.role === "admin" && (
            <Link href="/admin" className="text-red-600 font-semibold">
              Admin
            </Link>
          )}

          {profile?.role === "seller" && (
            <Link href="/seller">Panel</Link>
          )}

          {user && (
            <div className="flex items-center gap-3">
              <span>{user.email}</span>

              {profile?.plan === "premium" && (
                <span className="bg-green-100 text-green-700 px-2 py-1 text-xs rounded">
                  PREMIUM
                </span>
              )}

              <button
                onClick={logout}
                className="text-red-500"
              >
                Çıkış
              </button>
            </div>
          )}

          {!user && <Link href="/login">Giriş</Link>}

        </nav>
      </div>
    </header>
  );
}