// 1. 낮/테스트
import { testData1 } from "./day_test/testData1";
import { testData2 } from "./day_test/testData2";
import { testData3 } from "./day_test/testData3";
import { testData4 } from "./day_test/testData4";
import { testData5 } from "./day_test/testData5";
import { testData6 } from "./day_test/testData6";
import { testData7 } from "./day_test/testData7";
import { testData8 } from "./day_test/testData8";
import { testData9 } from "./day_test/testData9";
import { testData10 } from "./day_test/testData10";
import { testData11 } from "./day_test/testData11";
import { testData12 } from "./day_test/testData12";

// 2. 낮/타로
import { taroData1 } from "./day_taro/taroData1";
import { taroData2 } from "./day_taro/taroData2";
import { taroData3 } from "./day_taro/taroData3";
import { taroData4 } from "./day_taro/taroData4";
import { taroData5 } from "./day_taro/taroData5";
import { taroData6 } from "./day_taro/taroData6";
import { taroData7 } from "./day_taro/taroData7";
import { taroData8 } from "./day_taro/taroData8";
import { taroData9 } from "./day_taro/taroData9";
import { taroData10 } from "./day_taro/taroData10";
import { taroData11 } from "./day_taro/taroData11";
import { taroData12 } from "./day_taro/taroData12";
import { taroData13 } from "./day_taro/taroData13";

// 3. 밤/테스트
import { horrorTestData1 } from "./night_test/testData1";
import { horrorTestData2 } from "./night_test/testData2";
import { horrorTestData3 } from "./night_test/testData3";
import { horrorTestData4 } from "./night_test/testData4";
import { horrorTestData5 } from "./night_test/testData5";
import { horrorTestData6 } from "./night_test/testData6";
import { horrorTestData7 } from "./night_test/testData7";
import { horrorTestData8 } from "./night_test/testData8";
import { horrorTestData9 } from "./night_test/testData9";
import { horrorTestData10 } from "./night_test/testData10";
import { horrorTestData11 } from "./night_test/testData11";
import { horrorTestData12 } from "./night_test/testData12";
import { horrorTestData13 } from "./night_test/testData13";
import { horrorTestData14 } from "./night_test/testData14";
import { horrorTestData15 } from "./night_test/testData15";
import { horrorTestData16 } from "./night_test/testData16";

export const TotalDataStore = {
  day: {
    test: [
      testData11, // 셰프
      testData8, // 아이돌
      testData9, // 전생 직업
      testData1, // 디저트
      testData2, // 원석
      testData3, // 판타지
      testData4, // 여행
      testData5, // 직업
      testData6, // 강아지
      testData7, // 휴양지
      testData10, // 패션
      testData12, // 향기
    ],
    taro: [
      taroData1, //2026 총운
      taroData11, //2026 상반기 놀라운 일
      taroData13, //2026 상반기 인연
      taroData2, //그 사람 속마음
      taroData3, //오늘 운세
      taroData7, //오늘 금전운
      taroData4, //오늘 행운 아이템
      taroData5, //오늘 행운 장소
      taroData6, //지금 필요한 한마디
      taroData8, //운명 궁합
      taroData9, //질문 명쾌 대답
      taroData10, //타인이 보는 내 모습
      taroData12, //미래 운명적 인연
    ],
  },
  night: {
    test: [
      horrorTestData1, // 대기표
      horrorTestData15, // 장화홍련
      horrorTestData10, // 야생동물
      horrorTestData2, // 저수지
      horrorTestData13, // 학교
      horrorTestData14, // 병원
      horrorTestData16, // 심청이
      horrorTestData5, // 세차
      horrorTestData11, // 엘리베이터
      horrorTestData12, // 편의점
      horrorTestData3, // 대답먼저1
      horrorTestData4, // 대답먼저2
      horrorTestData7, // 인수인계
      horrorTestData8, // 계절 사이비
      horrorTestData9, // 등대
      horrorTestData6, // 반사
    ],
    book: [
      horrorTestData15, // 장화홍련 (스토리 포함)
    ],
  },
};

// 하위 호환을 위한 타입 정의 (선택사항)
export type ThemeType = "day" | "night";
export type ContentType = "test" | "taro" | "book";
