export const testData4 = {
  id: 4,
  path: "",
  title: "✈️\n여행 스타일\n테스트",
  tags: [
    "여행", "휴가", "관광", "계획", "MBTI", 
    "성격", "취향", "비행기", "숙소", "P", 
    "J", "동행", "여름휴가", "해외여행", "자유여행"
  ],
  questions: [
    {
      questionId: 1,
      text: "여행지로 떠나기 전, 짐을 싸는 당신의 스타일은?",
      options: [
        {
          optionId: "A",
          text: "리스트를 작성해 카테고리별로 완벽하게 정리한다.",
          score: { J_score: 2, S_score: 1 },
        },
        {
          optionId: "B",
          text: "필요한 것만 대충 던져 넣고 현지에서 조달한다.",
          score: { P_score: 2, E_score: 1 },
        },
        {
          optionId: "C",
          text: "혹시 모를 상황을 대비해 감성 소품까지 꼼꼼히 챙긴다.",
          score: { N_score: 1, F_score: 1, I_score: 1 },
        },
      ],
    },
    {
      questionId: 2,
      text: "비행기 안에서 당신은 주로 무엇을 하나요?",
      options: [
        {
          optionId: "A",
          text: "도착해서 먹을 맛집과 동선을 다시 확인한다.",
          score: { J_score: 2, T_score: 1 },
        },
        {
          optionId: "B",
          text: "창밖 풍경을 보며 이번 여행의 설렘을 메모한다.",
          score: { N_score: 2, F_score: 1 },
        },
        {
          optionId: "C",
          text: "안대 쓰고 푹 자면서 컨디션 관리에 집중한다.",
          score: { S_score: 1, I_score: 2 },
        },
      ],
    },
    {
      questionId: 3,
      text: "낯선 여행지에 도착하자마자 느껴지는 감정은?",
      options: [
        {
          optionId: "A",
          text: "북적이는 사람들과 공기! 에너지가 솟구친다.",
          score: { E_score: 2, S_score: 1 },
        },
        {
          optionId: "B",
          text: "미지의 세계에 던져진 듯한 묘한 상상에 빠진다.",
          score: { N_score: 2, I_score: 1 },
        },
        {
          optionId: "C",
          text: "일단 안전하게 숙소까지 가는 것에만 집중한다.",
          score: { J_score: 1, T_score: 1, I_score: 1 },
        },
      ],
    },
    {
      questionId: 4,
      text: "예약한 식당이 문을 닫았다면 당신의 대처는?",
      options: [
        {
          optionId: "A",
          text: "당황하지 않고 미리 준비한 '플랜 B' 맛집으로 간다.",
          score: { J_score: 2, T_score: 1 },
        },
        {
          optionId: "B",
          text: "오히려 좋아! 근처에 사람 많아 보이는 곳에 들어간다.",
          score: { P_score: 2, E_score: 1 },
        },
        {
          optionId: "C",
          text: "속상하지만 근처 조용한 곳을 찾아 대충 끼니를 때운다.",
          score: { F_score: 1, I_score: 2 },
        },
      ],
    },
    {
      questionId: 5,
      text: "여행 중 가장 행복한 순간은 언제인가요?",
      options: [
        {
          optionId: "A",
          text: "유명한 랜드마크에서 완벽한 인증샷을 남길 때.",
          score: { S_score: 2, E_score: 1 },
        },
        {
          optionId: "B",
          text: "길을 걷다 우연히 발견한 골목이 너무 예쁠 때.",
          score: { P_score: 1, N_score: 2 },
        },
        {
          optionId: "C",
          text: "숙소에서 좋아하는 음악을 들으며 혼자 쉴 때.",
          score: { I_score: 2, F_score: 1 },
        },
      ],
    },
    {
      questionId: 6,
      text: "현지인이 말을 걸어온다면 당신은?",
      options: [
        {
          optionId: "A",
          text: "번역기를 돌려서라도 신나게 대화를 이어간다.",
          score: { E_score: 2, F_score: 1 },
        },
        {
          optionId: "B",
          text: "필요한 정보만 예의 바르게 묻고 짧게 대답한다.",
          score: { T_score: 2, I_score: 1 },
        },
        {
          optionId: "C",
          text: "당황해서 웃으며 자리를 피하거나 친구 뒤에 숨는다.",
          score: { I_score: 2, S_score: 1 },
        },
      ],
    },
    {
      questionId: 7,
      text: "여행 예산이 생각보다 많이 남았다면?",
      options: [
        {
          optionId: "A",
          text: "마지막 날 가장 비싸고 화려한 저녁을 먹는다.",
          score: { E_score: 1, S_score: 1, P_score: 1 },
        },
        {
          optionId: "B",
          text: "가족이나 지인들에게 줄 선물을 더 정성껏 산다.",
          score: { F_score: 2, J_score: 1 },
        },
        {
          optionId: "C",
          text: "나중을 위해 저축하거나 꼭 필요했던 고가품을 산다.",
          score: { T_score: 2, J_score: 1 },
        },
      ],
    },
    {
      questionId: 8,
      text: "여행을 마치고 집으로 돌아와서 가장 먼저 하는 일은?",
      options: [
        {
          optionId: "A",
          text: "짐을 바로 정리하고 세탁기를 돌린 뒤 쉰다.",
          score: { J_score: 2, S_score: 1 },
        },
        {
          optionId: "B",
          text: "찍은 사진들을 SNS에 올리며 추억을 공유한다.",
          score: { E_score: 2, N_score: 1 },
        },
        {
          optionId: "C",
          text: "일단 침대에 쓰러져 여행의 여운을 혼자 즐긴다.",
          score: { I_score: 2, P_score: 1 },
        },
      ],
    },
  ],

  results: {
    ESFJ: { result: "", title: "친절한 가이드", description: "모두가 행복한 여행을 위해 헌신하는 당신은 최고의 동행자입니다." },
    ENTP: { result: "", title: "기발한 탐험가", description: "지루한 코스는 거부한다! 어디서든 새로운 재미를 찾아내는 모험가입니다." },
    ENFP: { result: "", title: "낭만 여행자", description: "가는 곳마다 축제 분위기로 만드는 당신은 여행지의 주인공입니다." },
    ESFP: { result: "", title: "분위기 메이커", description: "현지의 즐거움을 온몸으로 만끽하는 당신은 자유로운 영혼입니다." },
    ESTP: { result: "", title: "실전 근육맨", description: "생각보다는 행동! 짜릿한 액티비티를 즐기는 에너자이저입니다." },
    ISFP: { result: "", title: "감성 산책러", description: "아름다운 풍경 속에 녹아들어 나만의 시간을 즐기는 예술가입니다." },
    ISTP: { result: "", title: "쿨한 해결사", description: "복잡한 건 질색! 가장 효율적이고 담백하게 여행을 즐깁니다." },
    ENFJ: { result: "", title: "따뜻한 리더", description: "일행을 배려하면서도 완벽한 코스를 이끄는 든든한 등대입니다." },
    ESTJ: { result: "", title: "정석 경영자", description: "시간 낭비는 금물! 체계적인 계획으로 알찬 여행을 완성합니다." },
    ISFJ: { result: "", title: "섬세한 배려왕", description: "조용히 뒤에서 모두를 챙기며 편안한 안식처를 제공합니다." },
    ISTJ: { result: "", title: "기록 장인", description: "약속과 원칙을 지키며 여행의 모든 순간을 정교하게 기록합니다." },
    INFP: { result: "", title: "꿈꾸는 방랑자", description: "여행지의 사소한 것에도 의미를 부여하며 깊은 감동을 느낍니다." },
    INFJ: { result: "", title: "통찰하는 여행자", description: "단순 관광보다는 그 장소의 정신과 깊이를 이해하려 노력합니다." },
    ENTJ: { result: "", title: "카리스마 대장", description: "최고의 효율과 퀄리티를 위해 여행 전체를 지휘하는 지휘관입니다." },
    INTP: { result: "", title: "독립적 사색가", description: "남들의 시선은 신경 쓰지 않고 본인만의 지적 호기심을 충족합니다." },
    INTJ: { result: "", title: "완벽한 전략가", description: "오차 없는 계획과 분석으로 여행의 정수를 경험하는 지략가입니다." },
  },
};