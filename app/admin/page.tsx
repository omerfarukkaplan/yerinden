"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AdminPage() {
  const [revenue, setRevenue] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const loadRevenue = async () => {
      const { data } = await supabase
        .from("payments")
        .select("*")
        .eq("status", "paid");

      const total = data?.reduce(
        (sum: number, p: any) => sum + p.amount,
        0
      );

      setRevenue(total || 0);
      setCount(data?.length || 0);
    };

    loadRevenue();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="bg-white p-6 shadow w-96">
        <p>Toplam Premium Satış:</p>
        <p className="text-3xl font-bold">{revenue} TL</p>
        <p>{count} abonelik</p>
      </div>
    </div>
  );
}