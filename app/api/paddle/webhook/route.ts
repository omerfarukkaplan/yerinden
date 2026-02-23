import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const body = await req.json()

  if (body.event_type === 'subscription.renewed') {

    const userId = body.data.customer.custom_data.user_id

    await supabase
      .from('producers')
      .update({
        premium_until: new Date(body.data.current_billing_period.ends_at)
      })
      .eq('id', userId)
  }

  if (body.event_type === 'subscription.canceled') {
    const userId = body.data.customer.custom_data.user_id

    await supabase
      .from('producers')
      .update({ premium_type: 'free' })
      .eq('id', userId)
  }

  return NextResponse.json({ ok: true })
}