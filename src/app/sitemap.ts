import { MetadataRoute } from "next";
import { TotalDataStore } from "../allTestData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pickletest.com";
  const allTestPages: MetadataRoute.Sitemap = [];

  // XML 안전 문자로 변환 (Next.js sitemap 도구에서 자동 처리되기도 하지만 유지합니다)
  const escapeXml = (url: string) => url.replace(/&/g, "&amp;");

  // 결과 코드 매핑 (기존 page.tsx에 있던 것과 동일하게 유지)
  const MASK_MAP: { [key: string]: string } = {
    ENFP: "p01",
    ENFJ: "p02",
    ENTP: "p03",
    ENTJ: "p04",
    ESFP: "p05",
    ESFJ: "p06",
    ESTP: "p07",
    ESTJ: "p08",
    INFP: "p09",
    INFJ: "p10",
    INTP: "p11",
    INTJ: "p12",
    ISFP: "p13",
    ISFJ: "p14",
    ISTP: "p15",
    ISTJ: "p16",
    TYPE_R: "h01",
    TYPE_B: "h02",
    TYPE_J: "h03",
    TYPE_O: "h04",
    TYPE_C: "h05",
  };

  const modes = ["day", "night"] as const;

  modes.forEach((mode) => {
    // 해당 모드의 모든 카테고리 (test, taro, book 등)를 순회
    Object.keys(TotalDataStore[mode]).forEach((type) => {
      const tests = (TotalDataStore[mode] as any)[type];

      tests.forEach((t: any) => {
        // 1. 준비 페이지 (testReady)
        allTestPages.push({
          url: escapeXml(
            `${baseUrl}/testReady/${t.id}?mode=${mode}&type=${type}`
          ),
          lastModified: new Date(),
          priority: 0.8,
        });

        // 2. 시작 페이지 (testStart)
        allTestPages.push({
          url: escapeXml(
            `${baseUrl}/testStart/${t.id}?mode=${mode}&type=${type}`
          ),
          lastModified: new Date(),
          priority: 0.7,
        });

        // 3. 결과 페이지 (testResult) - 각 테스트가 가진 결과들을 순회
        if (t.results) {
          Object.keys(t.results).forEach((resultKey) => {
            const maskCode = MASK_MAP[resultKey] || resultKey.toLowerCase();
            allTestPages.push({
              url: escapeXml(
                `${baseUrl}/testResult/${t.id}/${maskCode}?mode=${mode}&type=${type}`
              ),
              lastModified: new Date(),
              priority: 0.6,
            });
          });
        }
      });
    });
  });

  return [
    { url: baseUrl, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), priority: 0.5 },
    ...allTestPages,
  ];
}
