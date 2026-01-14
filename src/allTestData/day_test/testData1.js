export const testData1 = {
  id: 1,
  path: "/img/test_ready_img/dessert.png",
  title: "🍨\n달콤한\n디저트 테스트",
  tags: [
    "음식", "디저트", "카페", "간식", "MBTI", 
    "성격", "심리", "취향", "달콤한", "힐링",
    "당충전", 
  ],
  questions: [
    {
      questionId: 1,
      text: "카페에 들어서면 가장 먼저 보이는 것은?",
      options: [
        { optionId: "A", text: "왁자지껄 대화하는 사람들의 활기", score: { E_score: 2, F_score: 1 } },
        { optionId: "B", text: "빠르게 주문 가능한 키오스크 위치", score: { J_score: 2, S_score: 1 } },
        { optionId: "C", text: "혼자 쉬기 좋은 조용한 구석 자리", score: { I_score: 2, N_score: 1 } },
      ],
    },
    {
      questionId: 2,
      text: "메뉴판 앞에서 당신의 선택은?",
      options: [
        { optionId: "A", text: "여기서만 파는 독특한 도전적 메뉴", score: { N_score: 2, P_score: 1 } },
        { optionId: "B", text: "검증된 베스트셀러나 추천 메뉴", score: { S_score: 2, J_score: 1 } },
        { optionId: "C", text: "내가 늘 즐겨 먹던 익숙한 메뉴", score: { I_score: 1, S_score: 1 } },
      ],
    },
    {
      questionId: 3,
      text: "친구가 맛없다고 했던 디저트가 궁금하다면?",
      options: [
        { optionId: "A", text: "직접 먹어보고 내 식으로 판단한다", score: { P_score: 2, S_score: 1 } },
        { optionId: "B", text: "친구 말을 믿고 다른 걸 고른다", score: { J_score: 2, F_score: 1 } },
        { optionId: "C", text: "왜 맛없는지 논리적으로 물어본다", score: { T_score: 2, N_score: 1 } },
      ],
    },
    {
      questionId: 4,
      text: "디저트가 나왔을 때 가장 먼저 하는 행동은?",
      options: [
        { optionId: "A", text: "인증샷 찍어 SNS에 바로 공유하기", score: { E_score: 2, S_score: 1 } },
        { optionId: "B", text: "식기 전에 바로 맛 분석 시작하기", score: { T_score: 2, J_score: 1 } },
        { optionId: "C", text: "천천히 분위기와 비주얼 감상하기", score: { I_score: 1, F_score: 2 } },
      ],
    },
    {
      questionId: 5,
      text: "베이킹 도중 레시피와 다르게 흘러간다면?",
      options: [
        { optionId: "A", text: "원인을 분석하고 처음부터 다시 한다", score: { T_score: 2, J_score: 2 } },
        { optionId: "B", text: "새로운 맛이 날 거라며 즉흥적으로 계속한다", score: { P_score: 2, N_score: 1 } },
        { optionId: "C", text: "속상해서 누군가에게 위로받고 싶다", score: { F_score: 2, E_score: 1 } },
      ],
    },
    {
      questionId: 6,
      text: "디저트 맛집 정보를 찾는 방식은?",
      options: [
        { optionId: "A", text: "상세 후기와 별점을 꼼꼼히 비교 검색", score: { I_score: 1, T_score: 1, J_score: 1 } },
        { optionId: "B", text: "지인들이 많이 추천하는 곳으로 결정", score: { E_score: 2, F_score: 1 } },
        { optionId: "C", text: "가장 힙하고 트렌디해 보이는 곳 선택", score: { N_score: 2, P_score: 1 } },
      ],
    },
    {
      questionId: 7,
      text: "친구가 배부르다며 커피만 마시겠다고 한다면?",
      options: [
        { optionId: "A", text: "나눠 먹을 생각으로 조금 더 넉넉히 시킨다", score: { F_score: 2, E_score: 1 } },
        { optionId: "B", text: "내 것만 깔끔하게 시켜서 집중해 먹는다", score: { I_score: 2, T_score: 1 } },
        { optionId: "C", text: "왜 안 먹는지 궁금해서 계속 물어본다", score: { T_score: 1, E_score: 1 } },
      ],
    },
    {
      questionId: 8,
      text: "포장해온 디저트를 먹기 전 당신의 상태는?",
      options: [
        { optionId: "A", text: "완벽하게 세팅하고 먹을 계획에 설렌다", score: { J_score: 2, S_score: 1 } },
        { optionId: "B", text: "참지 못하고 포장 뜯자마자 바로 먹는다", score: { P_score: 2, I_score: 1 } },
        { optionId: "C", text: "이걸 먹으며 느낄 행복한 상상에 빠진다", score: { N_score: 2, F_score: 1 } },
      ],
    },
  ],

  results: {
    ESFJ: {
      result: "/img/dessert_test/01.png", // result1
      title: "대용량 파티 브라우니",
      description:
        "사교성이 뛰어나고, 모두에게 기쁨을 주기 위해 노력하는 당신. 주변 사람들과의 조화를 최우선으로 생각하는 친선 도모자 디저트입니다.",
    },
    ENTP: {
      result: "/img/dessert_test/02.png", // result2
      title: "수제 막걸리 푸딩",
      description:
        "예측 불가능하고 기발한 아이디어의 소유자. 평범함을 거부하고 독창적인 조합을 시도하며, 세상에 없는 새로운 맛을 창조하는 변론가 디저트입니다.",
    },
    ENFP: {
      result: "/img/dessert_test/03.png", // result3
      title: "토핑 가득한 와플",
      description:
        "다채로운 매력과 호기심으로 가득 찬 당신. 자유롭고 즉흥적으로 삶의 재미를 찾아다니며, 예측 불가한 즐거움을 선사하는 활동가 디저트입니다.",
    },
    ESFP: {
      result: "/img/dessert_test/04.png", // result4
      title: "새콤한 맛의 젤리푸딩",
      description:
        "밝고 긍정적이며, 주변에 즐거움을 선사하는 당신. 순간을 즐기고 파티를 주도하는 자유로운 영혼의 연예인 디저트입니다.",
    },
    ESTP: {
      result: "/img/dessert_test/05.png", // result5
      title: "팡팡 터지는 팝콘",
      description:
        "즉흥적이고 에너지가 넘치며, 늘 새로운 트렌드의 중심에 있는 당신. 현장에서 행동하고 스릴을 즐기는 사업가 디저트입니다.",
    },
    ISFP: {
      result: "/img/dessert_test/06.png", // result6
      title: "예술적인 앙금 플라워 떡케이크",
      description:
        "섬세한 감각과 미적 재능으로 자신의 감정을 아름답게 표현하는 당신. 유연하고 자유로운 영혼의 모험가 디저트입니다.",
    },
    ISTP: {
      result: "/img/dessert_test/07.png", // result7
      title: "쌀과자",
      description:
        "단순하고 직관적이며, 복잡한 감정보다는 실용적인 결과와 과정을 중시하는 당신. 쿨하고 능숙하게 상황을 다루는 장인 디저트입니다.",
    },
    ENFJ: {
      result: "/img/dessert_test/08.png", // result8
      title: "따뜻한 컵케이크",
      description:
        "친근하고 다정하며, 주변 사람들에게 안정과 활력을 주는 당신. 모두가 행복하길 바라며 따뜻한 온기를 나누는 선지자 디저트입니다.",
    },
    ESTJ: {
      result: "/img/dessert_test/09.png", // result9
      title: "깔끔한 에스프레소",
      description:
        "복잡한 장식 없이 명료하고 효율성을 추구하는 당신. 목표 달성을 위해 체계적으로 움직이며, 결과를 중시하는 경영자 디저트입니다.",
    },
    ISFJ: {
      result: "/img/dessert_test/10.png", // result10
      title: "오리지널 플레인 스콘",
      description:
        "자극적이지 않고 편안함을 주는 당신. 주변을 조용히 돌보며 안정적인 환경을 만드는 데 헌신하는 수호자 디저트입니다.",
    },
    ISTJ: {
      result: "/img/dessert_test/11.png", // result11
      title: "단단한 정통 초콜릿",
      description:
        "변치 않는 신뢰와 책임감을 상징하는 당신. 원칙을 중시하고 묵묵히 자신의 임무를 수행하며, 믿음을 주는 현실주의자 디저트입니다.",
    },
    INFP: {
      result: "/img/dessert_test/12.png", // result12
      title: "오래된 레시피의 마들렌",
      description:
        "소박한 외관 속에 깊은 감성과 가치를 지닌 당신. 자신의 내면의 기준을 중요시하며, 잔잔한 감동을 주는 소중한 중재자 디저트입니다.",
    },
    INFJ: {
      result: "/img/dessert_test/13.png", // result13
      title: "마카롱",
      description:
        "겉은 화려하지 않아도 속은 깊은 공감과 이상을 담고 있는 당신. 타인에게 긍정적인 영향을 주고, 섬세한 감정의 조화를 중요시하는 옹호자 디저트입니다.",
    },
    ENTJ: {
      result: "/img/dessert_test/14.png", // result14
      title: "화려한 3단 케이크",
      description:
        "시선을 압도하는 존재감과 확실한 목표 의식을 가진 당신. 모든 일을 주도하며 강력한 리더십으로 목표를 실현하는 지휘관 디저트입니다.",
    },
    INTP: {
      result: "/img/dessert_test/15.png", // result15
      title: "무설탕/비건 대체 아이스크림",
      description:
        "일반적이지 않은 조합과 깊은 탐구를 즐기는 당신. 논리적이지만 새로운 아이디어에 열려 있으며, 건강과 원리를 모두 따지는 사색가 디저트입니다.",
    },
    INTJ: {
      result: "/img/dessert_test/16.png", // result16
      title: "완벽한 클래식 타르트",
      description:
        "깊이 있는 맛과 완벽한 구조를 추구하는 당신. 빈틈없는 계획과 논리로 삶을 설계하며, 오차 없는 만족감을 추구하는 분석가 디저트입니다.",
    },
  },
};
