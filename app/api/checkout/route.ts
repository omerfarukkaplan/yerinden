import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { priceId, userId } = await req.json()

  const res = await fetch('https://api.paddle.com/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.PADDLE_API_KEY}`,
    },
    body: JSON.stringify({
      items: [{ price_id: priceId, quantity: 1 }],
      customer: {
        custom_data: {
          user_id: userId
        }
      }
    }),
  })

  const data = await res.json()

  return NextResponse.json(data)
}