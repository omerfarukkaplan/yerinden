import { supabaseAdmin } from "@/lib/supabaseServer"
import Link from "next/link"

export default async function HomePage() {

  const { data: cities } = await supabaseAdmin
    .from("cities")
    .select("*")
    .order("name")

  const { data: listings } = await supabaseAdmin
    .from("listings")
    .select("*")
    .eq("category_slug", "giyim")
    .order("score", { ascending: false })
    .limit(12)

  return (
    <main className="max-w-7xl mx-auto px-4 py-16">

      {/* HERO */}
      <section className="text-center mb-20">
        <h1 className="text-5xl font-extrabold mb-4 neon-text">
          Türkiye'nin Yeni Nesil Giyim Platformu
        </h1>
        <p className="text-gray-600 mb-8">
          Premium satıcılar • Boost sistemi • Gelişmiş filtreleme
        </p>

        <Link
          href="/seller/listings/new"
          className="neon-button"
        >
          İlan Ver
        </Link>
      </section>

      {/* ŞEHİR FİLTRE */}
      <section className="mb-16">
        <div className="glass-card p-8 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-green-700">
            Şehrine Göre Giyim İlanları
          </h2>

          <form action="/search" className="grid md:grid-cols-3 gap-4">
            <select
              name="city"
              className="select-premium"
              required
            >
              <option value="">İl Seç</option>
              {cities?.map((city: any) => (
                <option key={city.slug} value={city.slug}>
                  {city.name}
                </option>
              ))}
            </select>

            <select
              name="district"
              className="select-premium"
            >
              <option value="">İlçe Seç</option>
            </select>

            <button className="neon-button">
              Filtrele
            </button>
          </form>
        </div>
      </section>

      {/* PREMIUM LISTINGS */}
      <section>
        <h2 className="text-2xl font-bold mb-8 text-green-700">
          Öne Çıkan Giyim İlanları
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {listings?.map((item: any) => (
            <Link key={item.id} href={`/ilan/${item.id}`}>
              <div className="premium-card">
                <img
                  src={item.cover_image}
                  className="rounded-xl mb-4 h-48 w-full object-cover"
                />
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-green-600 font-bold mt-2">
                  {item.price} ₺
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  )
}