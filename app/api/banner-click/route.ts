import { supabaseAdmin } from "@/lib/supabaseServer";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const { data } = await supabaseAdmin
    .from("banners")
    .select("link")
    .eq("id", id)
    .single();

  await supabaseAdmin.rpc("increment_banner_click", {
    banner_id: id
  });

  return NextResponse.redirect(data.link);
}