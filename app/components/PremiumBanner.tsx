import { supabase } from '../../lib/supabase'

export default async function PremiumBanner() {

  const { data } = await supabase
    .from('banners')
    .select('*')
    .eq('is_active', true)
    .limit(1)

  if (!data?.length) return null

  const banner = data[0]

  return (
    <a href={banner.link} target="_blank">
      <div className="mb-8 rounded-xl overflow-hidden shadow-lg border border-yellow-400">
        <img
          src={banner.image_url}
          className="w-full h-40 object-cover"
        />
      </div>
    </a>
  )
}