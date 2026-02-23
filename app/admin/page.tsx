'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function AdminDashboard() {

  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('listings')
        .select('view_count, whatsapp_clicks')

      const totalViews = data?.reduce((a,b)=>a+(b.view_count||0),0)
      const totalClicks = data?.reduce((a,b)=>a+(b.whatsapp_clicks||0),0)

      setStats({
        views: totalViews,
        clicks: totalClicks,
        rate: totalViews ? ((totalClicks/totalViews)*100).toFixed(1) : 0
      })
    }

    load()
  }, [])

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-6">Conversion Dashboard</h1>

      <p>Toplam Görüntülenme: {stats?.views}</p>
      <p>Toplam WhatsApp: {stats?.clicks}</p>
      <p>Dönüşüm Oranı: %{stats?.rate}</p>
    </div>
  )
}