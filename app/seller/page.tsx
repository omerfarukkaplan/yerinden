'use client'

import { useEffect,useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function SellerProfile(){

  const [profile,setProfile]=useState<any>({})

  useEffect(()=>{
    const load=async()=>{
      const { data:{user} } = await supabase.auth.getUser()
      if(!user) return

      const { data } = await supabase
        .from('producers')
        .select('*')
        .eq('id',user.id)
        .single()

      setProfile(data)
    }

    load()
  },[])

  return (
    <div>
      <h1 className="text-3xl mb-6">Profil</h1>

      <p>Plan: {profile?.premium_type}</p>
      <p>Bitiş: {profile?.premium_until}</p>
    </div>
  )
}