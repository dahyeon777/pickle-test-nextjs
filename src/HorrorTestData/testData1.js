// HorrorTestData.ts

export const horrorTestData1 = {
  id: 1,
  path: "/img/horror_test_main/horror1.png",
  title: "「아직 당신의 이름은 불리지 않았습니다」",
  questions: [
    {
      questionId: 1,
      text: "당신은 어느 순간, 이미 대기표를 손에 쥐고 있다는 사실을 깨달았습니다.",
      options: [
        { optionId: "A", text: "번호를 다시 확인한다", score: { R: 2 } },
        {
          optionId: "B",
          text: "주변 사람들의 번호를 슬쩍 본다",
          score: { B: 1 },
        },
        {
          optionId: "C",
          text: "대기표를 접어 주머니에 넣는다",
          score: { J: 2 },
        },
      ],
    },
    {
      questionId: 2,
      text: "대기실 스피커에서 이름이 아닌 번호만 불리기 시작합니다. 그러나 일어나는 사람은 아무도 없습니다.",
      options: [
        {
          optionId: "A",
          text: "아직 호출되지 않아서라고 생각한다",
          score: { O: 2 },
        },
        { optionId: "B", text: "잘못된 호출이라 여긴다", score: { R: 1 } },
        {
          optionId: "C",
          text: "호출 방식이 바뀐 것을 의심한다",
          score: { B: 2 },
        },
      ],
    },
    {
      questionId: 3,
      text: "대기실 벽에는 시계가 하나 걸려 있지만, 초침은 움직이지 않고 있습니다.",
      options: [
        {
          optionId: "A",
          text: "원래 고장 난 시계라고 생각한다.",
          score: { R: 2 },
        },
        {
          optionId: "B",
          text: "시간을 확인할 필요가 없다고 느낀다",
          score: { J: 2 },
        },
        {
          optionId: "C",
          text: "다른 사람들도 시계를 보는지 확인한다",
          score: { O: 1 },
        },
      ],
    },
    {
      questionId: 4,
      text: "잠시 후, 누군가 자리에서 사라집니다. 대기표는 의자 위에 그대로 놓여 있습니다.",
      options: [
        {
          optionId: "A",
          text: "호출되어 들어간 것이라 생각한다",
          score: { R: 1 },
        },
        { optionId: "B", text: "그냥 나간 것이라 생각한다", score: { O: 2 } },
        {
          optionId: "C",
          text: "언제부터 있었는지 기억을 더듬는다",
          score: { B: 2 },
        },
      ],
    },
    {
      questionId: 5,
      text: "스피커에서 당신의 번호와 비슷한 숫자가 불립니다. 한 자리만 다릅니다.",
      options: [
        { optionId: "A", text: "아직 아니라고 판단한다", score: { R: 2 } },
        { optionId: "B", text: "혹시 모르니 준비한다", score: { B: 2 } },
        {
          optionId: "C",
          text: "이미 불린 것일지도 모른다고 생각한다",
          score: { J: 2 },
        },
      ],
    },
    {
      questionId: 6,
      text: "대기표를 다시 보니, 번호 아래에 작게 이름이 적혀 있던 것 같기도 합니다.",
      options: [
        {
          optionId: "A",
          text: "지금까지 못 본 게 이상하다고 느낀다",
          score: { O: 2 },
        },
        { optionId: "B", text: "원래 흐릿했을 거라 생각한다", score: { R: 2 } },
        { optionId: "C", text: "굳이 확인하지 않는다", score: { J: 1 } },
      ],
    },
    {
      questionId: 7,
      text: "대기실 문이 열렸다 닫힐 때마다 안쪽에서 아무 소리도 들리지 않습니다.",
      options: [
        {
          optionId: "A",
          text: "방음이 잘 된 공간이라 생각한다",
          score: { R: 2 },
        },
        {
          optionId: "B",
          text: "아무도 없을 가능성을 떠올린다",
          score: { O: 2 },
        },
        { optionId: "C", text: "굳이 상상하지 않으려 한다", score: { B: 1 } },
      ],
    },
    {
      questionId: 8,
      text: "어느 순간부터 다른 사람들의 대기표가 잘 보이지 않습니다.",
      options: [
        { optionId: "A", text: "시선을 피하고 있다고 느낀다", score: { B: 2 } },
        {
          optionId: "B",
          text: "내가 잘못 보고 있다고 생각한다",
          score: { R: 2 },
        },
        {
          optionId: "C",
          text: "원래부터 관심 없었다고 여긴다",
          score: { J: 1 },
        },
      ],
    },
    {
      questionId: 9,
      text: "스피커에서 다시 호출이 나옵니다. 이번엔 번호 없이, 짧은 침묵 후 멈춥니다.",
      options: [
        { optionId: "A", text: "다음 호출을 기다린다", score: { R: 1 } },
        { optionId: "B", text: "지금이 내 차례일지 고민한다", score: { J: 2 } },
        { optionId: "C", text: "누군가 불렸다고 가정한다", score: { B: 1 } },
      ],
    },
    {
      questionId: 10,
      text: "대기실에 남아 있는 사람이 생각보다 적다는 것을 깨닫습니다.",
      options: [
        { optionId: "A", text: "오래 기다린 탓이라 생각한다", score: { R: 1 } },
        {
          optionId: "B",
          text: "중간에 빠진 사람이 많았다고 여긴다",
          score: { J: 1 },
        },
        {
          optionId: "C",
          text: "처음부터 이 인원이었을지도 모른다",
          score: { C: 2 },
        },
      ],
    },
  ],
  // HorrorTestData.ts 내부의 results 객체 부분

  results: {
    TYPE_R: {
      title: "① W-01 정상 대기 유지형",
      result: "/img/horror_results/type_r.png", // 사진 경로가 있다면 유지
      description: `상태: 생존 / 특징: 호출 인식 유지

▪ 사례 기록: 
A는 끝까지 자리에 앉아 있었다.
번호가 불릴 때마다 고개를 들었고,
불리지 않으면 다시 시선을 내렸다.

대기 시간이 얼마나 지났는지
A는 정확히 알지 못했다.
하지만 “아직이구나”라는 판단은
항상 유지했다.

A는 불렸다.
그리고 일어났다.

▪ 후대 분석
이 유형은
호출을 기다리는 것이 아니라 인식한다.
기다림 속에서도
자기 차례의 기준을 잃지 않는다.`,
    },
    TYPE_B: {
      title: "② L-02 호출 오인형",
      result: "", // 사진이 없으면 빈 문자열
      description: `상태: 생존 / 후유증: 경미한 기억 공백

▪ 사례 기록: 
B는 비슷한 숫자에 자주 반응했다.
한 자리 차이,
억양의 변화,
잠깐의 침묵에도 몸이 굳었다.

결국 B는
정확히 불리지 않았음에도
자리에서 일어났다.

돌아온 B는 말했다.
“분명 나였던 것 같아요.”

그 이후
B는 자신의 이름을
잠시 떠올리지 못했다.

▪ 후대 분석
호출 오인형은
기회보다 불안을 먼저 듣는다.
살아 돌아오지만
정체성 일부가 호출에 남는다.`,
    },
    TYPE_J: {
      title: "③ S-03 무기한 잔류형",
      result: "",
      description: `상태: 불명 / 특징: 기록 지속 중

▪ 사례 기록: 
C는
어느 순간부터 번호를 보지 않았다.

불리는지 아닌지는
중요하지 않다고 말했고,
“여기 있으면 되는 거잖아요”라고 했다.

C의 대기표는
훼손되지 않은 채
의자 위에 남아 있다.

▪ 후대 분석
이 유형은 사망으로 분류되지 않는다.
다만 호출 개념을 상실한다.
기록은 아직 종료되지 않았다.`,
    },
    TYPE_O: {
      title: "④ E-04 조기 이탈형",
      result: "",
      description: `상태: 생존 / 후유증: 반복적인 불안

▪ 사례 기록: 
D는
대기실이 비어 보이기 시작하자
자리에서 일어났다.

“이상하다”는 말만 남기고
문을 열었다.

D는 밖으로 나왔다.
그러나 이후
어떤 공간에서도
자신의 순서를 기다리지 못했다.

“언제 불릴지 모르겠어요.”

▪ 후대 분석
조기 이탈형은
대기 자체를 위험으로 판단한다.
생존은 했으나
기다림이 필요한 상황에 적응 불가.`,
    },
    TYPE_C: {
      title: "⑤ N-05 호출 미인지형",
      result: "",
      description: `상태: 사망 추정 / 특징: 기록 단절

▪ 사례 기록: 
E는 끝까지 앉아 있었다.

문이 열렸고,
누군가의 번호가 불렸으며,
의자는 비어 있었다.

E의 대기표는
찢어지지 않았고,
회수되지도 않았다.

그 이후
E에 대한 추가 호출 기록은 없다.

▪ 후대 분석
이 유형은
불렸으나 인지하지 못한 사례로 분류된다.
대기실은
그를 기다리지 않는다.`,
    },
  },
};

export const AllHorrorQuestionsData = [horrorTestData1];
