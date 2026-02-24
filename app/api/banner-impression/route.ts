import { supabaseAdmin } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  const { id } = await req.json();

  await supabaseAdmin.rpc("increment_banner_impression", {
    banner_id: id
  });

  return Response.json({ ok: true });
}