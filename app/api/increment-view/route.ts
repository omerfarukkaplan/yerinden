import { supabaseAdmin } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  const { id } = await req.json();

  await supabaseAdmin.rpc("increment_view", { listing_id: id });

  return Response.json({ ok: true });
}