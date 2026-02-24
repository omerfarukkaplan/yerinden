import { supabaseAdmin } from "@/lib/supabaseServer";

export default async function AdminDashboard() {
  const { data: premiumRevenue } = await supabaseAdmin
    .from("payments")
    .select("amount")
    .eq("type", "premium");

  const { data: boostRevenue } = await supabaseAdmin
    .from("payments")
    .select("amount")
    .eq("type", "boost");

  const { data: bannerRevenue } = await supabaseAdmin
    .from("banners")
    .select("price");

  const totalPremium =
    premiumRevenue?.reduce((a, b) => a + b.amount, 0) || 0;

  const totalBoost =
    boostRevenue?.reduce((a, b) => a + b.amount, 0) || 0;

  const totalBanner =
    bannerRevenue?.reduce((a, b) => a + b.price, 0) || 0;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">
        Admin Gelir Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="p-6 border rounded-xl">
          <h2>Premium Gelir</h2>
          <p className="text-xl font-bold">
            {totalPremium} TL
          </p>
        </div>

        <div className="p-6 border rounded-xl">
          <h2>Boost Gelir</h2>
          <p className="text-xl font-bold">
            {totalBoost} TL
          </p>
        </div>

        <div className="p-6 border rounded-xl">
          <h2>Banner Gelir</h2>
          <p className="text-xl font-bold">
            {totalBanner} TL
          </p>
        </div>
      </div>
    </div>
  );
}