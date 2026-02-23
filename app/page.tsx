"use client"

import { useEffect, useState } from "react"
import { createClient } from "../lib/supabase"

const supabase = createClient()

export default function HomePage() {
  const [listings, setListings] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const [city, setCity] = useState("")
  const [category, setCategory] = useState("")
  const [lastSeenDate, setLastSeenDate] = useState<string | null>(null)

  useEffect(() => {
    fetchListings()
  }, [])

  async function fetchListings(loadMore = false) {
    let query = supabase
      .from("listings")
      .select("*")
      .order("is_sponsored", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(20)

    if (search) {
      query = query.textSearch("search_vector", search, {
        type: "websearch"
      })
    }

    if (city) query = query.eq("city_slug", city)
    if (category) query = query.eq("category_slug", category)

    if (loadMore && lastSeenDate) {
      query = query.lt("created_at", lastSeenDate)
    }

    const { data } = await query

    if (data && data.length > 0) {
      setLastSeenDate(data[data.length - 1].created_at)
      setListings(loadMore ? [...listings, ...data] : data)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      
      {/* SEARCH BAR */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Ne arıyorsunuz?"
          className="flex-1 border p-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="text"
          placeholder="Şehir"
          className="border p-2 rounded"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <input
          type="text"
          placeholder="Kategori"
          className="border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button
          onClick={() => fetchListings(false)}
          className="bg-green-600 text-white px-6 rounded"
        >
          Ara
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-4 gap-6">
        {listings.map((item) => (
          <div
            key={item.id}
            className={`bg-white p-4 rounded-xl shadow transition ${
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
            <p className="text-sm text-gray-600 mb-2">
              {item.city_slug}
            </p>

            <p className="text-gray-800 font-semibold mb-4">
              {item.price} TL
            </p>

            <a
              href={`https://wa.me/${item.phone}`}
              target="_blank"
              className="bg-green-500 text-white px-4 py-2 rounded w-full block text-center"
            >
              WhatsApp
            </a>
          </div>
        ))}
      </div>

      {/* LOAD MORE */}
      <div className="text-center mt-10">
        <button
          onClick={() => fetchListings(true)}
          className="bg-black text-white px-6 py-2 rounded"
        >
          Daha Fazla
        </button>
      </div>
    </div>
  )
}