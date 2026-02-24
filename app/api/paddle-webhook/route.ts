import { supabaseAdmin } from "@/lib/supabaseServer";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get("paddle-signature");

  const secret = process.env.PADDLE_WEBHOOK_SECRET!;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  if (signature !== expected) {
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  const eventId = event.id;

  const { data: existing } = await supabaseAdmin
    .from("paddle_events")
    .select("*")
    .eq("id", eventId)
    .single();

  if (existing) {
    return NextResponse.json({ ok: true });
  }

  await supabaseAdmin.from("paddle_events").insert({
    id: eventId
  });

  const eventType = event.type;

  /* ================= PREMIUM SUBSCRIPTION ================= */

  if (eventType === "subscription.created") {
    const userId = event.data.custom_data.user_id;

    await supabaseAdmin
      .from("profiles")
      .update({
        is_premium: true,
        premium_until: new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000
        )
      })
      .eq("id", userId);

    await supabaseAdmin.from("payments").insert({
      user_id: userId,
      type: "premium",
      amount: 1499,
      paddle_transaction_id: event.data.id
    });
  }

  if (eventType === "subscription.cancelled") {
    const userId = event.data.custom_data.user_id;

    await supabaseAdmin
      .from("profiles")
      .update({
        is_premium: false
      })
      .eq("id", userId);
  }

  /* ================= BOOST ================= */

  if (eventType === "transaction.completed") {
    const listingId = event.data.custom_data.listing_id;
    const userId = event.data.custom_data.user_id;

    if (event.data.custom_data.type === "boost") {
      await supabaseAdmin
        .from("listings")
        .update({
          boost_until: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
          )
        })
        .eq("id", listingId);

      await supabaseAdmin.from("payments").insert({
        user_id: userId,
        listing_id: listingId,
        type: "boost",
        amount: 499,
        paddle_transaction_id: event.data.id
      });
    }
  }

  return NextResponse.json({ ok: true });
}