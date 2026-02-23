import { createClient } from "@/lib/supabase"

const supabase = createClient()

// SEO
export async function generateMetadata({ params }) {
  return {
    title: `${params.city} ${params.category} | Yerinden`,
    description: `${params.city} bölgesinde doğal ${params.category} üreticileri.`,
  }
}

export default async function CategoryPage({ params }) {
  const { city, category } = params

  const { data } = await supabase
    .from("listings")
    .select("*")
    .eq("city_slug", city)
    .eq("category_slug", category)
    .order("is_sponsored", { ascending: false })
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-white p-10">

      <h1 className="text-3xl font-bold mb-8 capitalize">
        {city} {category}
      </h1>

      <div className="grid grid-cols-4 gap-6">
        {data?.map((item) => (
          <div
            key={item.id}
            className={`border p-4 rounded-xl transition ${
              item.is_sponsored
                ? "ring-2 ring-pink-500 shadow-pink-200"
                : ""
            }`}
          >
            {item.is_sponsored && (
              <div className="text-xs text-pink-600 font-bold mb-2">
                SPONSORLU
              </div>
            )}

            <h2 className="font-bold text-lg">{item.title}</h2>
            <p className="text-sm text-gray-500 mb-2">
              {item.price} TL
            </p>

            <a
              href={`https://wa.me/${item.phone}`}
              target="_blank"
              className="bg-green-500 text-white px-4 py-2 rounded block text-center mt-4"
            >
              WhatsApp ile İletişim
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}