import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { type, listing_id } = body;

  if (type === "premium") {
    return NextResponse.json({
      url: `https://sandbox-checkout.paddle.com/checkout?price_id=${process.env.PADDLE_PREMIUM_PRICE_ID}`
    });
  }

  if (type === "boost") {
    return NextResponse.json({
      url: `https://sandbox-checkout.paddle.com/checkout?price_id=${process.env.PADDLE_BOOST_PRICE_ID}&listing_id=${listing_id}`
    });
  }

  return NextResponse.json({ error: "invalid type" }, { status: 400 });
}