import Link from "next/link";

export default function ListingCard({ item }: any) {
  const isBoosted =
    item.boost_until &&
    new Date(item.boost_until) > new Date();

  return (
    <Link
      href={`/ilan/${item.id}`}
      className="bg-white shadow hover:shadow-lg transition p-4 relative rounded"
    >
      {isBoosted && (
        <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
          🔥 BOOST
        </span>
      )}

      {item.is_featured && !isBoosted && (
        <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
          ⭐ PREMIUM
        </span>
      )}

      <img
        src={item.image_url}
        className="w-full h-48 object-cover mb-4 rounded"
      />

      <h2 className="font-semibold">{item.title}</h2>
      <p className="text-lg font-bold">{item.price} TL</p>
      <p className="text-sm text-gray-500">
        {item.views || 0} görüntülenme
      </p>
    </Link>
  );
}