import { horrorTestData1 } from "./testData1";

// 1. 모든 원본 데이터를 담은 리스트
export const AllHorrorQuestionsData = [horrorTestData1];

// 2. testDataList가 원본 객체 전체를 참조하도록 수정 (가장 중요!)
export const horrorTestDataList = AllHorrorQuestionsData;
