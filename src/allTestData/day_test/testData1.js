export const testData1 = {
  id: 1,
  path: "/img/test_ready_img/dessert.png",
  title: "🍨\n달콤한\n디저트 테스트",
  questions: [
    {
      questionId: 1,
      text: "카페에 들어서자마자, 당신의 시선은 어디로 향하는가?",
      options: [
        {
          optionId: "A",
          text: "테이블에 앉아있는 사람들의 대화나 분위기",
          score: { E_score: 2 },
        },
        {
          optionId: "B",
          text: "주문할 때 쓸 수 있는 메뉴판 또는 키오스크",
          score: { J_score: 1 },
        },
        {
          optionId: "C",
          text: "자신이 앉을 구석진 자리나 창가 자리",
          score: { I_score: 2 },
        },
        {
          optionId: "D",
          text: "진열대 위의 디저트 실물이나 샘플",
          score: { S_score: 1 },
        },
      ],
    },
    {
      questionId: 2,
      text: "디저트를 고를 때 가장 먼저 생각하는 것은?",
      options: [
        {
          optionId: "A",
          text: "새롭고 독특한 시즈널 메뉴나 이색적인 조합",
          score: { N_score: 2 },
        },
        {
          optionId: "B",
          text: "가장 인기 있거나 베스트셀러 표시가 있는 메뉴",
          score: { E_score: 1 },
        },
        {
          optionId: "C",
          text: "내가 전에 먹어보고 맛있었던 안전한 메뉴",
          score: { S_score: 2 },
        },
        {
          optionId: "D",
          text: "이 메뉴가 왜 만들어졌을지, 재료의 궁합은 어떨지",
          score: { I_score: 1 },
        },
      ],
    },
    {
      questionId: 3,
      text: "친구가 맛없다고 악평한 디저트가 눈에 들어왔다. 당신은?",
      options: [
        {
          optionId: "A",
          text: "혹시 나한테는 맛있을까? 직접 경험해보고 평가한다.",
          score: { P_score: 2 },
        },
        {
          optionId: "B",
          text: "친구 말을 믿고 바로 제외. 검증된 메뉴를 고른다.",
          score: { J_score: 2 },
        },
        {
          optionId: "C",
          text: "맛없다고? 왜 그런지 논리적으로 분석하며 맛본다.",
          score: { T_score: 1 },
        },
        {
          optionId: "D",
          text: "친구의 기분이나 취향을 배려하며 다른 메뉴를 추천한다.",
          score: { F_score: 1 },
        },
      ],
    },
    {
      questionId: 4,
      text: "디저트가 나왔을 때, 가장 먼저 하는 행동은?",
      options: [
        {
          optionId: "A",
          text: "먹기 전에 완벽한 각도로 사진 10장 이상을 찍는다.",
          score: { S_score: 1 },
        },
        {
          optionId: "B",
          text: "바로 한 입 베어 물고 맛의 분석을 시작한다.",
          score: { T_score: 2 },
        },
        {
          optionId: "C",
          text: "같이 온 사람들에게 먼저 맛보라고 권유하며 반응을 살핀다.",
          score: { E_score: 1 },
        },
        {
          optionId: "D",
          text: "사진은 간단히 찍고, 맛을 천천히 음미하며 감상에 빠진다.",
          score: { F_score: 1 },
        },
      ],
    },
    {
      questionId: 5,
      text: "디저트 만들기에 도전했다. 계획대로 되지 않았을 때 당신은?",
      options: [
        {
          optionId: "A",
          text: "실패 원인을 논리적으로 분석하고, 다음 시도를 계획한다.",
          score: { T_score: 2 },
        },
        {
          optionId: "B",
          text: "의외의 새로운 맛이 났다면, 즉흥적으로 '신메뉴'로 포장한다.",
          score: { P_score: 1 },
        },
        {
          optionId: "C",
          text: "결과물에 실망하여 자책하며 기분이 상한다.",
          score: { F_score: 2 },
        },
        {
          optionId: "D",
          text: "정석 레시피로 돌아가 처음부터 다시 정확히 시작한다.",
          score: { J_score: 1 },
        },
      ],
    },
    {
      questionId: 6,
      text: "디저트 맛집 정보를 얻는 방식은?",
      options: [
        {
          optionId: "A",
          text: "블로그나 인스타그램 후기, 리뷰를 꼼꼼히 찾아보고 신중하게 결정한다.",
          score: { I_score: 1 },
        },
        {
          optionId: "B",
          text: "유명 셰프나 파티시에의 깊이 있는 철학을 먼저 탐독한다.",
          score: { N_score: 2 },
        },
        {
          optionId: "C",
          text: "친구들이 '가봤다'는 즉각적인 추천이나 바이럴에 따른다.",
          score: { E_score: 2 },
        },
        {
          optionId: "D",
          text: "가장 많은 사람이 간 곳, 현재 줄이 긴 곳을 직관적으로 따라간다.",
          score: { S_score: 1 },
        },
      ],
    },
    {
      questionId: 7,
      text: "함께 간 사람이 디저트를 주문하지 않고 커피만 마시겠다고 한다면?",
      options: [
        {
          optionId: "A",
          text: "혼자 먹어도 괜찮지만, 혹시 먹고 싶어질까 봐 나눠먹을 준비를 한다.",
          score: { F_score: 2 },
        },
        {
          optionId: "B",
          text: "왜 디저트를 먹지 않는지 이유를 분석하고, 합리적인 조언을 한다.",
          score: { T_score: 1 },
        },
        {
          optionId: "C",
          text: "각자의 취향이니 상관없다. 내 것만 완벽하게 즐긴다.",
          score: { I_score: 2 },
        },
        {
          optionId: "D",
          text: "다 같이 먹는 재미가 없어서 아쉽다. 다음에 올 곳을 제안한다.",
          score: { E_score: 1 },
        },
      ],
    },
    {
      questionId: 8,
      text: "새로운 디저트를 맛보았을 때, 당신이 느끼는 만족감의 기준은?",
      options: [
        {
          optionId: "A",
          text: "내가 생각했던 맛의 이상향과 얼마나 일치하는지",
          score: { N_score: 1 },
        },
        {
          optionId: "B",
          text: "맛과 식감, 눈으로 보는 비주얼이 얼마나 조화로운지",
          score: { S_score: 2 },
        },
        {
          optionId: "C",
          text: "내가 이 디저트를 먹고 기분이 얼마나 좋아졌는지",
          score: { F_score: 1 },
        },
        {
          optionId: "D",
          text: "가격 대비 양이나 재료의 품질이 합리적인지",
          score: { T_score: 2 },
        },
      ],
    },
    {
      questionId: 9,
      text: "디저트를 사서 집으로 돌아가는 길, 당신의 발걸음은?",
      options: [
        {
          optionId: "A",
          text: "집에 가서 뭘 하면서 먹을지 벌써 계획이 서 있다.",
          score: { J_score: 2 },
        },
        {
          optionId: "B",
          text: "집에 가서 포장 뜯자마자 바로 먹을 수 있다.",
          score: { P_score: 1 },
        },
        {
          optionId: "C",
          text: "가는 길에 디저트 사진을 찍어 SNS에 자랑한다.",
          score: { E_score: 1 },
        },
        {
          optionId: "D",
          text: "디저트 상자가 망가지지 않게 조심스럽게 들고 간다.",
          score: { I_score: 1 },
        },
      ],
    },
    {
      questionId: 10,
      text: "디저트를 남겨야 할 상황이다. 당신의 행동은?",
      options: [
        {
          optionId: "A",
          text: "포장해서 가져간다. 내일 아침에 먹을 계획을 세운다.",
          score: { J_score: 1 },
        },
        {
          optionId: "B",
          text: "남긴 걸 보며 아쉬워하지만, 일단 지금은 포기한다.",
          score: { P_score: 2 },
        },
        {
          optionId: "C",
          text: "남겨진 조각을 보며, 나중에 생각날 것 같은 아련한 감정에 빠진다.",
          score: { F_score: 1 },
        },
        {
          optionId: "D",
          text: "남기는 것이 가장 합리적인 선택이었는지 이성적으로 검토한다.",
          score: { T_score: 1 },
        },
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
