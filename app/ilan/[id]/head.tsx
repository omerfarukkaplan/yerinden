export default function Head({ params }: any) {
  return (
    <>
      <title>Yerinden - İlan Detay</title>
      <meta name="description" content="Yerinden doğal ürün ilanı" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Yerinden Ürün",
          }),
        }}
      />
    </>
  );
}