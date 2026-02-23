
export default function Home() {
  const cities = ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Antalya', 'Adana', 'Konya', 'Gaziantep', 'Mersin', 'Diyarbakir', 'Kayseri', 'Eskisehir', 'Samsun', 'Denizli', 'Sakarya', 'Kocaeli', 'Malatya', 'Trabzon', 'Erzurum', 'Van'];
  const categories = ['Koy Yumurtasi', 'Dogal Zeytinyagi', 'Ev Salcasi', 'Koy Peyniri', 'Dogal Bal', 'Tereyagi', 'Tarhana', 'Eriste', 'Pekmez', 'Kurutulmus Sebze', 'Sut', 'Yogurt', 'Baharat', 'Recel', 'Tursu', 'Organik Sebze', 'Organik Meyve', 'Zeytin', 'Kurutulmus Meyve', 'Ev Yapimi Ekmek'];

  return (
    <div className="p-12 space-y-16">
      <section>
        <h2 className="text-4xl font-bold neon-text mb-8">Büyükşehirler</h2>
        <div className="grid grid-cols-4 gap-6">
          {cities.map(c => (
            <div key={c} className="card text-center">
              {c}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-4xl font-bold text-neonPink mb-8">Kategoriler</h2>
        <div className="grid grid-cols-4 gap-6">
          {categories.map(cat => (
            <div key={cat} className="card text-center border-neonPink/40">
              {cat}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
