// app/sitemap.ts
import { MetadataRoute } from "next";
import { TotalDataStore } from "../allTestData"; // 경로 확인 필요

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pickletest.com";

  // 모든 카테고리를 순회하며 URL 생성
  const allTestPages: MetadataRoute.Sitemap = [];

  // 1. Day - Test & Taro
  TotalDataStore.day.test.forEach((t) => {
    allTestPages.push({
      url: `${baseUrl}/testReady/${t.id}?mode=day&type=test`,
      lastModified: new Date(),
    });
  });
  TotalDataStore.day.taro.forEach((t) => {
    allTestPages.push({
      url: `${baseUrl}/testReady/${t.id}?mode=day&type=taro`,
      lastModified: new Date(),
    });
  });

  // 2. Night - Test & Book
  TotalDataStore.night.test.forEach((t) => {
    allTestPages.push({
      url: `${baseUrl}/testReady/${t.id}?mode=night&type=test`,
      lastModified: new Date(),
    });
  });
  TotalDataStore.night.book.forEach((t) => {
    allTestPages.push({
      url: `${baseUrl}/testReady/${t.id}?mode=night&type=book`,
      lastModified: new Date(),
    });
  });

  return [
    { url: baseUrl, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), priority: 0.5 },
    ...allTestPages,
  ];
}