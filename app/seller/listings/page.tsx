'use client'

import { useEffect,useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function MyListings(){

  const [listings,setListings]=useState<any[]>([])

  useEffect(()=>{
    const load=async()=>{
      const { data:{user} } = await supabase.auth.getUser()
      if(!user) return

      const { data } = await supabase
        .from('listings')
        .select('*')
        .eq('producer_id',user.id)

      setListings(data || [])
    }

    load()
  },[])

  return (
    <div>
      <h1 className="text-3xl mb-6">İlanlarım</h1>

      {listings.map(item=>(
        <div key={item.id} className="border p-4 mb-4">
          {item.title}
        </div>
      ))}
    </div>
  )
}