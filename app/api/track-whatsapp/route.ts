import { supabaseAdmin } from "@/lib/supabaseServer";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  await supabaseAdmin.rpc("increment_whatsapp", { listing_id: id });

  return NextResponse.redirect("https://wa.me/905XXXXXXXXX");
}