"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth");
      } else {
        setEmail(user.email ?? null);
      }

      setLoading(false);
    }

    checkAuth();
  }, [router]);

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Yükleniyor...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r shadow-sm p-6 space-y-6">

        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Yerinden" width={40} height={40} />
          <span className="font-bold text-green-600 text-lg">
            Satıcı Paneli
          </span>
        </div>

        <nav className="flex flex-col gap-4 text-sm font-medium">
          <button
            onClick={() => router.push("/seller")}
            className="text-left hover:text-green-600"
          >
            Profil Bilgileri
          </button>

          <button
            onClick={() => router.push("/dashboard")}
            className="text-left hover:text-green-600"
          >
            Premium Yükselt
          </button>

          <button
            onClick={() => router.push("/ilan")}
            className="text-left hover:text-green-600"
          >
            İlanlarım
          </button>
        </nav>

        <div className="pt-10 border-t">
          <p className="text-xs text-gray-400 mb-2">
            {email}
          </p>
          <button
            onClick={logout}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}