import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("paddle-signature") || "";

  const expected = crypto
    .createHmac("sha256", process.env.PADDLE_WEBHOOK_SECRET!)
    .update(rawBody)
    .digest("hex");

  if (expected !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const body = JSON.parse(rawBody);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Idempotency: Aynı transaction tekrar işlenmesin
  const { data: existing } = await supabase
    .from("processed_transactions")
    .select("*")
    .eq("transaction_id", body.data.id)
    .single();

  if (existing) {
    return NextResponse.json({ ok: true });
  }

  if (body.event_type === "transaction.completed") {

    await supabase.rpc("activate_premium", {
      pid: body.data.custom_data.producer_id,
      ptype: body.data.custom_data.plan
    });

    await supabase.from("processed_transactions").insert({
      transaction_id: body.data.id
    });
  }

  if (body.event_type === "subscription.canceled") {
    await supabase
      .from("producers")
      .update({ premium_type: "free" })
      .eq("id", body.data.custom_data.producer_id);
  }

  return NextResponse.json({ success: true });
}