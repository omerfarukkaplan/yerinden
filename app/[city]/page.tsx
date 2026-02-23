import { createClient } from "@supabase/supabase-js";

export async function generateStaticParams() {
  const cities = [
    "istanbul","ankara","izmir","bursa","antalya","adana","konya","gaziantep",
    "mersin","diyarbakir","kayseri","eskisehir","samsun","denizli","sakarya",
    "kocaeli","malatya","trabzon","erzurum","van"
  ];

  return cities.map(city => ({ city }));
}

export default async function CityPage({ params }: any) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data } = await supabase
    .from("listings")
    .select("*")
    .eq("city_slug", params.city);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">
        {params.city} Doğal Ürünler
      </h1>

      <div className="grid grid-cols-3 gap-6">
        {data?.map((item) => (
          <div key={item.id}>{item.title}</div>
        ))}
      </div>
    </div>
  );
}