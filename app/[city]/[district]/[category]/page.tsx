import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface Props {
  params: {
    city: string;
    district: string;
    category: string;
  };
}

export default async function Page({ params }: Props) {
  const { city, district, category } = params;

  // Şehir bul
  const { data: cityData } = await supabase
    .from("cities")
    .select("*")
    .eq("slug", city)
    .single();

  if (!cityData) return notFound();

  // İlçe bul
  const { data: districtData } = await supabase
    .from("districts")
    .select("*")
    .eq("slug", district)
    .eq("city_id", cityData.id)
    .single();

  if (!districtData) return notFound();

  // Kategori bul
  const { data: categoryData } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", category)
    .single();

  if (!categoryData) return notFound();

  // İlanları getir
  const { data: listings } = await supabase
    .from("listings")
    .select("*")
    .eq("city_id", cityData.id)
    .eq("district_id", districtData.id)
    .eq("category_id", categoryData.id);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">
        {cityData.name} {districtData.name} {categoryData.name}
      </h1>

      <div className="grid grid-cols-3 gap-6">
        {listings?.map((item) => (
          <div key={item.id} className="border p-4 rounded-lg">
            <h2 className="font-semibold">{item.title}</h2>
            <p>{item.price} ₺</p>
          </div>
        ))}
      </div>
    </div>
  );
}