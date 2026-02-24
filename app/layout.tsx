import "./globals.css"
import Link from "next/link"

export const metadata = {
  title: "Yerinden - Giyim İlan Platformu",
  description: "Premium satıcı, boost sistemi ve gelişmiş filtreleme"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className="bg-gradient-to-br from-green-50 via-white to-emerald-50 min-h-screen text-gray-800">

        <header className="border-b bg-white/70 backdrop-blur sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center text-white font-bold shadow-lg">
                Y
              </div>
              <span className="text-2xl font-bold text-green-600">
                Yerinden
              </span>
            </Link>

            <nav className="flex gap-6 text-sm font-medium">
              <Link href="/seller">Satıcı Paneli</Link>
              <Link href="/login">Giriş</Link>
              <Link href="/register">Kayıt Ol</Link>
            </nav>
          </div>
        </header>

        {children}

        <footer className="mt-20 border-t bg-white py-10">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-6 text-sm">
            <div>
              <h4 className="font-bold mb-3 text-green-600">Yerinden</h4>
              <p>Türkiye’nin yeni nesil giyim ilan platformu.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Kurumsal</h4>
              <ul className="space-y-1">
                <li><Link href="/kvkk">KVKK</Link></li>
                <li><Link href="/gizlilik">Gizlilik Politikası</Link></li>
                <li><Link href="/kullanim">Kullanım Şartları</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Satıcı</h4>
              <ul className="space-y-1">
                <li><Link href="/seller">Panel</Link></li>
                <li><Link href="/upgrade">Premium Ol</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">İletişim</h4>
              <p>info@yerinden.com</p>
            </div>
          </div>
        </footer>

      </body>
    </html>
  )
}