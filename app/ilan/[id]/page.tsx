'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'

export default function ListingDetail({ params }: any) {

  const [listing, setListing] = useState<any>(null)

  useEffect(() => {
    const load = async () => {

      // İlanı çek
      const { data } = await supabase
        .from('listings')
        .select('*')
        .eq('id', params.id)
        .single()

      if (!data) return

      setListing(data)

      // 👁 View artır
      await supabase
        .from('listings')
        .update({
          view_count: (data.view_count || 0) + 1
        })
        .eq('id', data.id)
    }

    load()
  }, [])

  if (!listing) return <div className="p-10">Yükleniyor...</div>

  // ✅ WhatsApp conversion fonksiyonu
  const handleWhatsApp = async () => {

    await supabase
      .from('listings')
      .update({
        whatsapp_clicks: (listing.whatsapp_clicks || 0) + 1
      })
      .eq('id', listing.id)

    window.open(
      `https://wa.me/${listing.phone}?text=Merhaba ${listing.title} ilanınız hakkında bilgi almak istiyorum`,
      '_blank'
    )
  }

  return (
    <div className="p-10 max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold mb-4">
        {listing.title}
      </h1>

      <p className="text-2xl text-green-600 mb-4">
        {listing.price} TL
      </p>

      <p className="mb-6">
        {listing.description}
      </p>

      <div className="flex gap-4">

        {/* WhatsApp CTA */}
        <button
          onClick={handleWhatsApp}
          className="bg-green-500 hover:bg-green-600 transition text-white px-6 py-3 rounded-xl shadow-lg"
        >
          WhatsApp ile İletişim
        </button>

        {/* Görüntülenme */}
        <div className="flex items-center text-gray-500">
          👁 {listing.view_count}
        </div>

      </div>
    </div>
  )
}