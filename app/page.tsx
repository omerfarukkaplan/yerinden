import PremiumBanner from './components/PremiumBanner'
import { supabase } from '../lib/supabase'
import Link from 'next/link'

export default async function Home() {

  const { data: listings } = await supabase
    .from('listings')
    .select('*')
    .eq('status', 'active')
    .order('sponsor_approved', { ascending: false })
    .order('created_at', { ascending: false })

  return (
    <div className="p-10 max-w-7xl mx-auto">

      <PremiumBanner />

      <h1 className="text-3xl font-bold mb-8">İlanlar</h1>

      <div className="grid md:grid-cols-4 gap-6">
        {listings?.map(item => (
          <Link key={item.id} href={`/ilan/${item.id}`}>
            <div className="p-5 border rounded-xl hover:scale-105 transition">
              <h2 className="font-bold">{item.title}</h2>
              <p>{item.price} TL</p>
              <p className="text-sm text-gray-500">
                👁 {item.view_count}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}