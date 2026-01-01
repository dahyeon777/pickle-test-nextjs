import { horrorTestData1 } from "./testData1";
import { horrorTestData2 } from "./testData2";
import { horrorTestData3 } from "./testData3";
import { horrorTestData4 } from "./testData4";
import { horrorTestData5 } from "./testData5";
import { horrorTestData6 } from "./testData6";
import { horrorTestData7 } from "./testData7";
import { horrorTestData8 } from "./testData8";
import { horrorTestData9 } from "./testData9";
import { horrorTestData10 } from "./testData10";

// 1. 모든 원본 데이터를 담은 리스트
export const AllHorrorQuestionsData = [
  horrorTestData1,
  horrorTestData2,
  horrorTestData3,
  horrorTestData4,
  horrorTestData5,
  horrorTestData6,
  horrorTestData7,
  horrorTestData8,
  horrorTestData9,
  horrorTestData10,
];

// 2. testDataList가 원본 객체 전체를 참조하도록 수정 (가장 중요!)
export const horrorTestDataList = AllHorrorQuestionsData;
