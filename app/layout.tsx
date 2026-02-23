import "./globals.css";
import Script from "next/script";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yerinden",
  description: "Türkiye Yerel Üretici Platformu",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="bg-white text-gray-800">

        {/* Paddle Script */}
        <Script
          src="https://cdn.paddle.com/paddle/v2/paddle.js"
          strategy="beforeInteractive"
        />

        {/* Paddle Init */}
        <Script id="paddle-init" strategy="afterInteractive">
          {`
            window.addEventListener("load", function () {
              if (window.Paddle) {
                window.Paddle.Environment.set("production");
                window.Paddle.Initialize({
                  token: "${process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN}"
                });
              }
            });
          `}
        </Script>

        {/* Navbar */}
        <nav className="p-6 flex justify-between items-center border-b shadow-sm">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="Yerinden" width={140} height={40} />
          </div>

          <div className="space-x-6 text-sm font-medium">
            <a href="/">Ana Sayfa</a>
            <a href="/ilan">İlanlar</a>
            <a href="/dashboard">Panel</a>
            <a href="/seller">Satıcı</a>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}