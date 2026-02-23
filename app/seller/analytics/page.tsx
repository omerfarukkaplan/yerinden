"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function SellerAnalytics() {
  const [stats, setStats] = useState({
    totalListings: 0,
    totalViews: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      const { data } = await supabase
        .from("listings")
        .select("*")
        .eq("user_id", user?.id);

      const totalViews = data?.reduce(
        (sum: number, item: any) => sum + item.views,
        0
      );

      setStats({
        totalListings: data?.length || 0,
        totalViews: totalViews || 0,
      });
    };

    loadStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>

      <div className="bg-white p-6 shadow w-96">
        <p>Toplam İlan: {stats.totalListings}</p>
        <p>Toplam Görüntülenme: {stats.totalViews}</p>
      </div>
    </div>
  );
}