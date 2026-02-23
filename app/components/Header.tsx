"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);

      if (data.user) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.user.id)
          .single();

        setProfile(profileData);
      }
    };

    load();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            width={40}
            height={40}
            alt="Yerinden"
          />
          <span className="text-xl font-bold text-green-600">
            Yerinden
          </span>
        </Link>

        {/* NAVIGATION */}
        <div className="flex items-center gap-6">

          {/* Premium badge */}
          {profile?.plan === "premium" && (
            <span className="bg-purple-600 text-white px-3 py-1 text-xs rounded">
              PREMIUM
            </span>
          )}

          {/* Satıcı Paneli */}
          {user && (
            <Link
              href="/seller"
              className="text-sm hover:text-green-600"
            >
              Satıcı Paneli
            </Link>
          )}

          {/* Admin */}
          {profile?.role === "admin" && (
            <Link
              href="/admin"
              className="text-sm text-red-600"
            >
              Admin
            </Link>
          )}

          {/* Giriş / Çıkış */}
          {!user ? (
            <Link
              href="/login"
              className="bg-green-600 text-white px-4 py-2 rounded text-sm"
            >
              Giriş Yap
            </Link>
          ) : (
            <>
              <span className="text-sm text-gray-600">
                {user.email}
              </span>
              <button
                onClick={logout}
                className="text-red-500 text-sm"
              >
                Çıkış
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}