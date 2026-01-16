// app/sitemap.ts
import { MetadataRoute } from "next";
import { TotalDataStore } from "../allTestData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pickletest.com";
  const allTestPages: MetadataRoute.Sitemap = [];

  // URL 내의 & 기호를 XML 안전 문자인 &amp;로 변환하는 헬퍼 함수
  const escapeXml = (url: string) => url.replace(/&/g, "&amp;");

  // 1. Day - Test
  TotalDataStore.day.test.forEach((t) => {
    allTestPages.push({
      url: escapeXml(`${baseUrl}/testReady/${t.id}?mode=day&type=test`),
      lastModified: new Date(),
    });
  });

  // 2. Day - Taro
  TotalDataStore.day.taro.forEach((t) => {
    allTestPages.push({
      url: escapeXml(`${baseUrl}/testReady/${t.id}?mode=day&type=taro`),
      lastModified: new Date(),
    });
  });

  // 3. Night - Test
  TotalDataStore.night.test.forEach((t) => {
    allTestPages.push({
      url: escapeXml(`${baseUrl}/testReady/${t.id}?mode=night&type=test`),
      lastModified: new Date(),
    });
  });

  // 4. Night - Book
  TotalDataStore.night.book.forEach((t) => {
    allTestPages.push({
      url: escapeXml(`${baseUrl}/testReady/${t.id}?mode=night&type=book`),
      lastModified: new Date(),
    });
  });

  return [
    { url: baseUrl, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), priority: 0.5 },
    ...allTestPages,
  ];
}