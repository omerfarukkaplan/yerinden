import "./globals.css";
import Header from "./components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-10">
          {children}
        </div>
      </body>
    </html>
  );
}