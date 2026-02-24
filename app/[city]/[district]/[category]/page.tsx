import { supabaseAdmin } from "@/lib/supabaseServer";
import { notFound } from "next/navigation";

export default async function Page({ params }: any) {
  const { city, district, category } = params;

  const { data: cityData } = await supabaseAdmin
    .from("cities")
    .select("*")
    .eq("slug", city)
    .single();

  if (!cityData) return notFound();

  const { data: districtData } = await supabaseAdmin
    .from("districts")
    .select("*")
    .eq("slug", district)
    .single();

  const { data: categoryData } = await supabaseAdmin
    .from("categories")
    .select("*")
    .eq("slug", category)
    .single();

  const { data: listings } = await supabaseAdmin
    .from("listings")
    .select("*, profiles(is_premium)")
    .eq("city_id", cityData.id)
    .eq("district_id", districtData.id)
    .eq("category_id", categoryData.id)
    .eq("is_active", true)
    .order("boost_until", { ascending: false })
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold">
        {cityData.name} {districtData.name} {categoryData.name}
      </h1>

      <div className="grid grid-cols-4 gap-6 mt-6">
        {listings?.map((item) => (
          <div key={item.id}>{item.title}</div>
        ))}
      </div>
    </div>
  );
}