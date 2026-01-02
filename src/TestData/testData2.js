const pic2 = "img/test_ready_img/fortune_today.png";

export const testData2 = {
  id: 2,
  path: pic2,
  title: "🔮\n오늘의 운세\n테스트",
  questions: [
    // 질문 1 (Question 1)
    {
      questionId: 1,
      text: "파티를 구성할 때, 당신이 가장 먼저 맡고 싶은 역할은?",
      options: [
        {
          optionId: "A",
          text: "최전선에서 아군을 보호하는 '탱커'",
          score: { Tank: 1 },
        },
        {
          optionId: "B",
          text: "적에게 강력한 피해를 입히는 '딜러'",
          score: { Dealer: 1 },
        },
        {
          optionId: "C",
          text: "아군을 치유하고 보조하는 '힐러'",
          score: { Healer: 1 },
        },
        {
          optionId: "D",
          text: "전략적으로 지휘하는 '리더'",
          score: { Leader: 1 },
        },
      ],
    },
    // ... 질문 2~8 (Question 2 ~ 8)
  ],
  // 결과 데이터도 여기에 추가할 수 있습니다.
  results: [
    // { type: 'Tank', title: '강철의 수호자', description: '...' },
    // ... 4개의 최종 결과
  ],
};
