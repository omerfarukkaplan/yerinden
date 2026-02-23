import "./globals.css";
import Script from "next/script";
import Header from "./components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="bg-gray-50">

        <Script
          src="https://cdn.paddle.com/paddle/v2/paddle.js"
          strategy="afterInteractive"
        />

        <Header />

        <main className="max-w-6xl mx-auto px-6 py-8">
          {children}
        </main>

      </body>
    </html>
  );
}