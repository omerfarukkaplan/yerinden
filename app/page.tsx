"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const cities = [
    "istanbul","ankara","izmir","bursa","antalya","adana","konya",
    "gaziantep","mersin","diyarbakir","kayseri","eskisehir",
    "samsun","denizli","sakarya","kocaeli","malatya",
    "trabzon","erzurum","van"
  ];

  const categories = [
    "koy-yumurtasi","dogal-zeytinyagi","ev-salcasi","koy-peyniri",
    "dogal-bal","tereyagi","tarhana","eriste","pekmez",
    "kurutulmus-sebze","sut","yogurt","baharat","recel",
    "tursu","organik-sebze","organik-meyve",
    "zeytin","kurutulmus-meyve","ev-yapimi-ekmek"
  ];

  return (
    <div className="p-12 space-y-16">

      <section>
        <h2 className="text-3xl font-bold mb-6 text-green-600">
          Büyükşehirler
        </h2>

        <div className="grid grid-cols-4 gap-4">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => router.push(`/ilan?city=${city}`)}
              className="border p-4 rounded-lg hover:border-green-500 hover:bg-green-50 transition"
            >
              {city.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 text-pink-500">
          Kategoriler
        </h2>

        <div className="grid grid-cols-4 gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => router.push(`/ilan?category=${cat}`)}
              className="border p-4 rounded-lg hover:border-pink-400 hover:bg-pink-50 transition"
            >
              {cat.replace("-", " ").toUpperCase()}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}