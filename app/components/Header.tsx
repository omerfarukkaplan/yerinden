"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Link from "next/link";

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
    <header className="bg-white shadow mb-6">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
        <Link href="/" className="text-2xl font-bold text-green-600">
          Yerinden
        </Link>

        <div className="flex items-center gap-6">
          {profile?.plan === "premium" && (
            <span className="bg-purple-600 text-white px-3 py-1 text-xs rounded">
              PREMIUM
            </span>
          )}

          {profile?.role === "admin" && (
            <Link href="/admin" className="text-red-600">
              Admin
            </Link>
          )}

          {user && (
            <>
              <span className="text-sm">{user.email}</span>
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