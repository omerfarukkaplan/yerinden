import { NextResponse } from 'next/server'

export async function POST(req: Request) {

  const { ip, message } = await req.json()

  const spamWords = ['casino','crypto','free money']

  const isSpam = spamWords.some(word =>
    message?.toLowerCase().includes(word)
  )

  return NextResponse.json({ blocked: isSpam })
}