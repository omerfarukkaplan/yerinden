import { supabaseAdmin } from "@/lib/supabaseServer";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const city = searchParams.get("city");
  const district = searchParams.get("district");
  const gender = searchParams.get("gender");
  const brand = searchParams.get("brand");
  const size = searchParams.get("size");
  const color = searchParams.get("color");
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const sort = searchParams.get("sort");

  let query = supabaseAdmin
    .from("listings")
    .select("*, profiles(is_premium)")
    .eq("is_active", true);

  if (city) query = query.eq("city_id", city);
  if (district) query = query.eq("district_id", district);
  if (gender) query = query.eq("gender", gender);
  if (brand) query = query.eq("brand", brand);
  if (size) query = query.eq("size", size);
  if (color) query = query.eq("color", color);
  if (min) query = query.gte("price", min);
  if (max) query = query.lte("price", max);

  if (sort === "price_asc") {
    query = query.order("price", { ascending: true });
  } else if (sort === "price_desc") {
    query = query.order("price", { ascending: false });
  } else if (sort === "popular") {
    query = query.order("view_count", { ascending: false });
  } else {
    query = query.order("boost_until", { ascending: false })
      .order("created_at", { ascending: false });
  }

  const { data } = await query;

  return NextResponse.json(data);
}