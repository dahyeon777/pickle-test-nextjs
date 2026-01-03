import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://pickletest.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    // 나중에 테스트 페이지 생기면 여기에 추가
  ];
}
