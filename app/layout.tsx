import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Yerinden",
  description: "Türkiye Yerel Üretici Platformu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="bg-bg text-white">

        {/* Paddle Script */}
        <Script
          src="https://cdn.paddle.com/paddle/v2/paddle.js"
          strategy="beforeInteractive"
        />

        {/* Paddle Initialize */}
        <Script id="paddle-init" strategy="afterInteractive">
          {`
            if (window.Paddle) {
              window.Paddle.Environment.set("production");
              window.Paddle.Initialize({
                token: "${process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN}"
              });
            }
          `}
        </Script>

        {/* Navbar */}
        <nav className="p-6 flex justify-between border-b border-neon/20">
          <h1 className="text-3xl font-bold neon-text">Yerinden</h1>

          <div className="space-x-6 text-sm">
            <a href="/">Ana Sayfa</a>
            <a href="/ilan">İlanlar</a>
            <a href="/dashboard">Panel</a>
            <a href="/admin">Admin</a>
            <a href="/b2b">B2B</a>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}