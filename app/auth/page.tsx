"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signUp() {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (!error && data.user) {
      await supabase.from("producers").insert({
        id: data.user.id,
        premium_type: "free",
      });

      router.push("/seller");
    }
  }

  async function signIn() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 border rounded-xl shadow-lg w-96 space-y-4">
        <h2 className="text-2xl font-bold text-green-600">
          Satıcı Giriş / Kayıt
        </h2>

        <input
          className="border p-2 w-full rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full rounded"
          placeholder="Şifre"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={signIn}
          className="w-full bg-gray-800 text-white py-2 rounded"
        >
          Giriş Yap
        </button>

        <button
          onClick={signUp}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Kayıt Ol
        </button>
      </div>
    </div>
  );
}