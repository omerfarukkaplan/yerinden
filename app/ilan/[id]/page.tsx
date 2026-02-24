import { supabaseAdmin } from "@/lib/supabaseServer";

export default async function ListingDetail({ params }: any) {
  const { id } = params;

  await supabaseAdmin.rpc("increment_view", { listing_id: id });

  const { data: listing } = await supabaseAdmin
    .from("listings")
    .select("*")
    .eq("id", id)
    .single();

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold">{listing.title}</h1>

      <div className="grid grid-cols-2 gap-4">
        {listing.image_urls?.map((img: string) => (
          <img key={img} src={img} className="rounded-xl" />
        ))}
      </div>

      <p className="text-xl font-bold">{listing.price} TL</p>

      <div className="flex gap-4">
        <a
          href={`/api/track-whatsapp?id=${id}`}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          WhatsApp
        </a>

        <a
          href={`/api/track-shopier?id=${id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Shopier
        </a>
      </div>
    </div>
  );
}