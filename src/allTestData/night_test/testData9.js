// HorrorTestData.ts

export const horrorTestData9 = {
  id: 9,
  path: "/img/horror_test_main/horror9.png",
  title: "🗼\n「등대 근무\n지침서」",
  tags: [
    "공포", "미스테리", "호러", "스릴러", "괴담", 
    "심리", "생존", "미지의존재", "서늘한", "무서운",
    "등대", "바다", "파도", "고립", "나폴리탄"
  ],
  questions: [
    {
      questionId: 1,
      text: "당신은 등대지기다.\n 오늘은 해무가 너무 짙어,\n등대의 불빛조차 바다에 닿지 않는다.",
      options: [
        {
          optionId: "A",
          text: "메뉴얼대로 점등의 밝기를 유지한다",
          score: { A: 1, C: 1 },
        },
        { optionId: "B", text: "밝기를 최대로 높인다", score: { B: 1, D: 1 } },
        { optionId: "C", text: "포기하고 점등을 끈다", score: { E: 1 } },
      ],
    },
    {
      questionId: 2,
      text: "무전기에서 잡음 섞인 신호가 들어온다.\n사람의 말소리 같기도 하고, 기괴한 울음소리 같기도 하다.",
      options: [
        { optionId: "A", text: "대화를 시도한다", score: { A: 1, D: 1 } },
        { optionId: "B", text: "응답하지 않고 기록한다", score: { C: 1 } },
        {
          optionId: "C",
          text: "환청이라 생각하고 차단한다",
          score: { B: 1, E: 1 },
        },
      ],
    },
    {
      questionId: 3,
      text: "등대 하부 계단 쪽에서\n물방울이 뚝뚝 떨어지는 소리가 들린다.\n지금 이곳엔 당신뿐이다.",
      options: [
        { optionId: "A", text: "직접 확인하러 내려간다", score: { D: 1 } },
        {
          optionId: "B",
          text: "상층부 문을 굳게 잠근다",
          score: { C: 2, A: 1 },
        },
        {
          optionId: "C",
          text: "누수라 생각하며 무시한다",
          score: { E: 1, B: 1 },
        },
      ],
    },
    {
      questionId: 4,
      text: "항로상 배가 있을 수 없는 위치에서\n작은 불빛 하나가 불규칙하게 깜빡인다.",
      options: [
        {
          optionId: "A",
          text: "조난 신호라고 생각하며 구조대에 연락한다",
          score: { C: 1, B: 1, A: 1 },
        },
        {
          optionId: "B",
          text: "등대 불빛의 방향을 그쪽으로 조정한다",
          score: { A: 1, B: 1, A: 1 },
        },
        {
          optionId: "C",
          text: "짙은 안개로 인한 착시라고 판단한다",
          score: { E: 1, B: 1 },
        },
      ],
    },
    {
      questionId: 5,
      text: "등대 꼭대기 유리창에 누군가의 손바닥 자국이 선명하게 남아 있다. '안쪽'에서 찍힌 자국이다.",
      options: [
        {
          optionId: "A",
          text: "내가 남긴 자국이라 여기며 깨끗하게 닦아낸다",
          score: { A: 1, D: 1, B: 1 },
        },
        {
          optionId: "B",
          text: "증거를 남기기 위해 기록용 사진을 촬영한다",
          score: { B: 1, C: 1 },
        },
        {
          optionId: "C",
          text: "천이나 종이 등으로 가려버리려 한다",
          score: { E: 1 },
        },
      ],
    },
    {
      questionId: 6,
      text: "파도 소리가 이상하리만큼\n일정한 리듬을 반복한다.",
      options: [
        {
          optionId: "A",
          text: "이어폰으로 소리를 차단한다",
          score: { E: 1, D: 1 },
        },
        { optionId: "B", text: "파도의 리듬을 기록한다", score: { C: 1 } },
        {
          optionId: "C",
          text: "신호라 생각하고 일부러 귀를 기울인다",
          score: { A: 1, B: 1 },
        },
      ],
    },
    {
      questionId: 7,
      text: "보급 예정일이 지났지만 아무도 오지 않는다.\n무전마저 완전히 끊겼다.",
      options: [
        {
          optionId: "A",
          text: "최후의 수단으로 비상 조명 신호를 발신한다",
          score: { A: 1, D: 1 },
        },
        {
          optionId: "B",
          text: "장기 고립에 대비해 식량 자급 계획을 세운다",
          score: { C: 1 },
        },
        {
          optionId: "C",
          text: "단순한 기상 악화라 믿으며 조금 더 기다려본다",
          score: { B: 1, E: 1 },
        },
      ],
    },
    {
      questionId: 8,
      text: "깊은 밤, 등대 불빛이 스스로 꺼졌다가 켜진다.",
      options: [
        {
          optionId: "A",
          text: "전기 계통의 일시적 결함이라 생각하고 재점등한다",
          score: { A: 1 },
        },
        {
          optionId: "B",
          text: "즉시 하부 배전반으로 내려가 원인을 점검한다",
          score: { D: 1 },
        },
        {
          optionId: "C",
          text: "누군가 보내는 경고라 생각하고 그대로 둔다",
          score: { B: 1, C: 1, E: 1 },
        },
      ],
    },
    {
      questionId: 9,
      text: "근무 일지에 당신의 필체가 아닌 낯선 문장이 적혀 있다.\n“오늘은 내려오지 않았다.”",
      options: [
        {
          optionId: "A",
          text: "해당 페이지를 찢어버린다",
          score: { C: 1, E: 1 },
        },
        {
          optionId: "B",
          text: "몽유병은 아닐지 심각하게 고민한다",
          score: { B: 1, D: 1 },
        },
        {
          optionId: "C",
          text: "오늘 예정된 하부 점검 일정을 다시 확인한다",
          score: { A: 1 },
        },
      ],
    },
    {
      questionId: 10,
      text: "마지막 밤, 등대 아래에서\n누군가 당신의 이름을 애타게 부르는 소리가 들립니다.",
      options: [
        {
          optionId: "A",
          text: "구조대가 왔음을 확신하고 계단을 달려 내려간다",
          score: { D: 5 },
        },
        {
          optionId: "B",
          text: "상대를 식별하기 위해 등대 서치라이트를 아래로 비춘다",
          score: { C: 1, B: 1, A: 1 },
        },
        {
          optionId: "C",
          text: "함정임을 직감하고 어떤 대답도 하지 않은 채 숨는다",
          score: { E: 1 },
        },
      ],
    },
  ],

  results: {
    TYPE_A: {
      title: "결과 A — 침식",
      result: "",
      description: `당신은 마지막까지 지침을 준수하며 등대를 지켰습니다. 
불빛은 꺼지지 않았고, 기록은 성실했습니다.

하지만 바다는 당신의 성실함을 길잡이 삼아 등대 안으로 스며들었습니다.
다음 보급선이 도착했을 때, 등대는 여전히 밝게 빛나고 있었지만
그 안에는 마르지 않은 짠물과 텅 빈 옷가지만이 발견되었습니다.

죄송합니다. 당신은 흡수되었습니다.`,
    },
    TYPE_B: {
      title: "결과 B — 교대",
      result: "",
      description: `누군가 계단으로 올라와 상층부 문을 열었습니다.
그것과 마주친 당신은 근무를 교대했습니다.
      
축하드립니다. 당신은 무사히 육지로 돌아갔습니다.
당신의 신체는 모두 멀쩡합니다.
      
다만 이후 곧바로 은퇴했습니다.
그리고 다시는 바다를 찾지 않았습니다.`,
    },
    TYPE_C: {
      title: "결과 C — 고립",
      result: "",
      description: `등대는 여전히 바다를 향해 빛을 쏘고 있습니다.
당신은 외부와의 접촉을 모두 차단한 채 물리적으로 살아남았습니다.

하지만 문을 열고 들어온 구조대가 마주한 것은,
거울을 보며 알 수 없는 언어로 
벽에 일지를 쓰고 있는 정체 모를 존재였습니다.

당신이라는 인격은 그 긴 밤의 정적 속에 영원히 매몰되었습니다.`,
    },
    TYPE_D: {
      title: "결과 D — 하강",
      result: "",
      description: `당신은 궁금증을 참지 못하고, 
혹은 누군가를 구하기 위해 아래로 내려갔습니다.

하지만 하강을 시작하고서
당신은 누구와도 마주치지 못했습니다.

그것은 밑으로 내려가는 
'계단'이 아니었습니다.

당신은 끝나지 않는 그곳을 돌고돌다
스스로 바다 속으로 뛰어들었습니다.

등대 위쪽에는 이제 아무도 없습니다.`,
    },
    TYPE_E: {
      title: "결과 E — 점등 중단",
      result: "",
      description: `불은 마지막으로 한 번 더 깜빡인 뒤 완전히 사멸했습니다.
당신이 꺼뜨린 것인지, 
아니면 꺼지도록 내버려 둔 것인지는 중요하지 않습니다.

등대와 함께 항로도, 
그리고 당신이라는 존재의 좌표도 세상에서 영원히 지워졌습니다.
이제 이곳은 지도 위에 존재하지 않는 검은 구멍일 뿐입니다.`,
    },
  },
};

export const AllHorrorQuestionsData = [horrorTestData9];
