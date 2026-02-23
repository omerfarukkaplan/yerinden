import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const body = await req.json();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  if (body.event_type === "transaction.completed") {
    const userId = body.data.custom_data.user_id;

    await supabase
      .from("profiles")
      .update({
        plan: "premium",
        plan_expires_at: new Date(Date.now() + 30 * 86400000),
      })
      .eq("id", userId);

    await supabase.from("payments").insert({
      user_id: userId,
      amount: 1299,
      status: "paid",
    });
  }

  if (body.event_type === "subscription.canceled") {
    const userId = body.data.custom_data.user_id;

    await supabase
      .from("profiles")
      .update({
        plan: "basic",
        plan_expires_at: null,
      })
      .eq("id", userId);
  }

  return NextResponse.json({ success: true });
}