import { testData1 } from "./testData1";
import { testData2 } from "./testData2";
import { testData3 } from "./testData3";
import { testData4 } from "./testData4";
import { testData5 } from "./testData5";
import { testData6 } from "./testData6";
import { testData7 } from "./testData7";
import { testData8 } from "./testData8";
import { testData9 } from "./testData9";
import { testData10 } from "./testData10";
import { testData11 } from "./testData11";
import { testData12 } from "./testData12";
import { testData13 } from "./testData13";
import { testData14 } from "./testData14";

// 1. 모든 원본 데이터를 담은 리스트
export const AllTestQuestionsData = [
  testData12, //신년운세 2026
  testData11, //셰프
  testData8, //아이돌
  testData9, //전생 직업
  testData1, // 디저트
  testData14, //속마음
  testData2, // 원석
  testData3, // 판타지
  testData4, //여행
  testData5, //직업
  testData6, //강아지
  testData7, //휴양지
  testData10, //패션
  testData13, //향기
];

// 2. testDataList가 원본 객체 전체를 참조하도록 수정 (가장 중요!)
export const testDataList = AllTestQuestionsData;
