import { supabaseAdmin } from "@/lib/supabaseServer";
import { cookies } from "next/headers";

export default async function Analytics() {
  const cookieStore = cookies();
  const userId = cookieStore.get("user-id")?.value;

  const { data: listings } = await supabaseAdmin
    .from("listings")
    .select("*")
    .eq("user_id", userId);

  const totalViews = listings?.reduce(
    (acc, l) => acc + l.view_count,
    0
  );

  const totalClicks = listings?.reduce(
    (acc, l) => acc + l.whatsapp_clicks,
    0
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="p-6 border rounded-xl">
          <h2>Toplam Görüntülenme</h2>
          <p className="text-xl font-bold">{totalViews}</p>
        </div>

        <div className="p-6 border rounded-xl">
          <h2>WhatsApp Tıklama</h2>
          <p className="text-xl font-bold">{totalClicks}</p>
        </div>
      </div>
    </div>
  );
}