"use client";

import { useEffect } from "react";

export default function Banner({ banners }: any) {
  useEffect(() => {
    banners?.forEach((banner: any) => {
      fetch("/api/banner-impression", {
        method: "POST",
        body: JSON.stringify({ id: banner.id })
      });
    });
  }, [banners]);

  return (
    <div className="space-y-4">
      {banners?.map((banner: any) => (
        <a
          key={banner.id}
          href={`/api/banner-click?id=${banner.id}`}
        >
          <img
            src={banner.image_url}
            className="rounded-xl w-full"
          />
        </a>
      ))}
    </div>
  );
}