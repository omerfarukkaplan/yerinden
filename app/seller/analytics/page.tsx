'use client'

import { useEffect,useState } from 'react'
import { supabase } from '../../../lib/supabase'

export default function Analytics(){

  const [data,setData]=useState<any[]>([])

  useEffect(()=>{
    const load=async()=>{
      const { data:{user} } = await supabase.auth.getUser()
      if(!user) return

      const { data } = await supabase
        .from('listings')
        .select('title,view_count,whatsapp_clicks')
        .eq('producer_id',user.id)

      setData(data || [])
    }

    load()
  },[])

  return (
    <div>
      <h1 className="text-3xl mb-6">Analytics</h1>

      {data.map(item=>{
        const rate =
          item.view_count
            ? ((item.whatsapp_clicks/item.view_count)*100).toFixed(1)
            : 0

        return (
          <div key={item.title} className="border p-4 mb-4">
            <p>{item.title}</p>
            <p>👁 {item.view_count}</p>
            <p>💬 {item.whatsapp_clicks}</p>
            <p>Conversion %{rate}</p>
          </div>
        )
      })}
    </div>
  )
}