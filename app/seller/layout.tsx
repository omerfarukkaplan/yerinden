export default function SellerLayout({ children }) {
  return (
    <div className="flex">

      <aside className="w-64 bg-gray-100 min-h-screen p-6">
        <h2 className="text-xl font-bold mb-6">Satıcı Paneli</h2>

        <ul className="space-y-4">
          <li><a href="/seller">Profil</a></li>
          <li><a href="/seller/listings">İlanlarım</a></li>
          <li><a href="/seller/analytics">Analytics</a></li>
        </ul>
      </aside>

      <main className="flex-1 p-10">
        {children}
      </main>

    </div>
  )
}