// HorrorTestData.ts

export const horrorTestData1 = {
  id: 1,
  path: "/img/horror_test_main/horror1.png",
  title: "📢\n「아직 당신의 이름은\n불리지 않았습니다」",
  tags: [
    "공포", "미스테리", "호러", "스릴러", "이름", 
    "대기실", "호출", "쪽지", "경고", "괴담", 
    "심리", "MBTI", "생존", "미지의존재", "서늘한","무서운", "나폴리탄"
  ],
  questions: [
    {
      questionId: 1,
      text: "눈을 뜨니 낯선 장소.\n 의자에 앉아있고 손에는 대기표가 쥐어져 있다.",
      options: [
        { optionId: "A", text: "대기표에 적힌 번호를 본다", score: { R: 2 } },
        {
          optionId: "B",
          text: "앉아있는 다른 사람들을 관찰한다",
          score: { B: 1, O: 1 },
        },
        {
          optionId: "C",
          text: "대기표를 접어 주머니에 넣는다",
          score: { J: 2, C: 1 },
        },
      ],
    },
    {
      questionId: 2,
      text: "대기실 구석 스피커에서 번호를 부른다.\n 그러나 일어나는 사람은 아무도 없다.",
      options: [
        {
          optionId: "A",
          text: "아직 아무도 호출되지 않았다고 생각한다",
          score: { O: 2 },
        },
        { optionId: "B", text: "잘못된 호출이라 여긴다", score: { R: 2 } },
        {
          optionId: "C",
          text: "호출 방식이 바뀐 것을 의심한다",
          score: { B: 2, C: 1 },
        },
      ],
    },
    {
      questionId: 3,
      text: "대기실 벽에는 시계가 하나 걸려 있지만,\n 초침은 움직이지 않는다.",
      options: [
        {
          optionId: "A",
          text: "원래 고장 난 시계라고 생각한다",
          score: { R: 2, C: 1 },
        },
        {
          optionId: "B",
          text: "시간을 확인할 필요가 없다고 느낀다",
          score: { J: 2 },
        },
        {
          optionId: "C",
          text: "다른 사람들도 시계를 보는지 확인한다",
          score: { O: 2 },
        },
      ],
    },
    {
      questionId: 4,
      text: "잠시 후, 누군가 자리에서 사라진다.\n 대기표는 의자 위에 그대로 놓여 있다.",
      options: [
        {
          optionId: "A",
          text: "호출되어 들어간 것이라 생각한다",
          score: { R: 1, J: 1 },
        },
        { optionId: "B", text: "그냥 나간 것이라 생각한다", score: { O: 2 } },
        {
          optionId: "C",
          text: "언제부터 있었는지 기억을 더듬는다",
          score: { B: 2, C: 1 },
        },
      ],
    },
    {
      questionId: 5,
      text: "내 번호와 비슷한 숫자가 불린다.\n 한 자리만 다르다.",
      options: [
        {
          optionId: "A",
          text: "아직 아니라고 판단한다",
          score: { R: 2, O: 1 },
        },
        { optionId: "B", text: "혹시 모르니 준비한다", score: { B: 2 } },
        {
          optionId: "C",
          text: "이미 불린 것일지도 모른다고 생각한다",
          score: { J: 2, C: 1 },
        },
      ],
    },
    {
      questionId: 6,
      text: "대기표를 다시 보니,\n 번호 아래에 흐릿하게 이름이 적혀있다.",
      options: [
        {
          optionId: "A",
          text: "지금까지 못 본 게 이상하다고 느낀다",
          score: { O: 2, B: 1 },
        },
        {
          optionId: "B",
          text: "원래 흐릿했을 거라 생각한다",
          score: { R: 2, C: 1 },
        },
        { optionId: "C", text: "굳이 확인하지 않는다", score: { J: 2 } },
      ],
    },
    {
      questionId: 7,
      text: "대기실 문이 열렸다 닫힐 때마다\n 안쪽에서 아무 소리도 들리지 않는다.",
      options: [
        {
          optionId: "A",
          text: "방음이 잘 된 공간이라 생각한다",
          score: { R: 2, J: 1 },
        },
        {
          optionId: "B",
          text: "아무도 없을 가능성을 떠올린다",
          score: { O: 2, C: 1 },
        },
        { optionId: "C", text: "굳이 상상하지 않으려 한다", score: { B: 2 } },
      ],
    },
    {
      questionId: 8,
      text: "어느 순간부터 다른 사람들의\n 대기표가 잘 보이지 않는다.",
      options: [
        {
          optionId: "A",
          text: "시선을 피하고 있다고 느낀다",
          score: { B: 2, O: 1 },
        },
        {
          optionId: "B",
          text: "내가 잘못 보고 있다고 생각한다",
          score: { R: 2, C: 2 },
        },
        {
          optionId: "C",
          text: "원래부터 관심 없었다고 여긴다",
          score: { J: 2 },
        },
      ],
    },
    {
      questionId: 9,
      text: "스피커에서 다시 호출이 나온다.\n 이번엔 번호 없이, 짧은 침묵 후 멈춘다.",
      options: [
        { optionId: "A", text: "다음 호출을 기다린다", score: { R: 2, J: 1 } },
        {
          optionId: "B",
          text: "지금이 내 차례일지 고민한다",
          score: { B: 2, O: 2 },
        },
        { optionId: "C", text: "누군가 불렸다고 가정한다", score: { C: 2 } },
      ],
    },
    {
      questionId: 10,
      text: "대기실에 남아 있는 사람이\n 생각보다 적다는 것을 깨닫는다.",
      options: [
        {
          optionId: "A",
          text: "오래 기다린 탓이라 생각한다",
          score: { R: 1, J: 2 },
        },
        {
          optionId: "B",
          text: "중간에 빠진 사람이 많았다고 여긴다",
          score: { O: 2, B: 1 },
        },
        {
          optionId: "C",
          text: "처음부터 이 인원이었을지도 모른다",
          score: { C: 3 },
        },
      ],
    },
  ],
  // HorrorTestData.ts 내부의 results 객체 부분

  results: {
    TYPE_R: {
      title: "① W-01 정상 대기 유지형",
      result: "", // 사진 경로가 있다면 유지
      description: `상태: 생존
특징: 호출 인식 유지

A는 끝까지 자리에 앉아 있었다.
번호가 불릴 때마다 고개를 들었고,
불리지 않으면 다시 시선을 내렸다.

대기 시간이 얼마나 지났는지
A는 정확히 알지 못했다.
하지만 “아직이구나”라는 판단은
항상 유지했다.

A는 불렸다.
그리고 문을 열고 들어갔다.

▪ 후대 분석
이 유형은
호출을 기다리는 것이 아니라 인식한다.
기다림 속에서도
자기 차례의 기준을 잃지 않는다.`,
    },
    TYPE_B: {
      title: "② L-02 호출 오인형",
      result: "",
      description: `상태: 생존
후유증: 경미한 기억 공백

B는 비슷한 숫자에 자주 반응했다.
한 자리 차이,
억양의 변화,
잠깐의 침묵에도 몸이 굳었다.

결국 B는
정확히 불리지 않았음에도
자리에서 일어났다.

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
      description: `상태: 불명
특징: 기록 지속 중
 
C는 어느 순간부터 번호를 확인하지 않았다.

"불리는지 아닌지는 중요하지 않아요.
여기 앉아서 계속 기다리면 되는 거잖아요”

C는 어느순간 사라졌다.
의자 위에는 그의 대기표만이 남았다.

▪ 후대 분석
이 유형은 사망으로 분류되지 않는다.
다만 영원히 호출을 기다리고 있을 뿐이다.
기록은 아직 종료되지 않았다.`,
    },
    TYPE_O: {
      title: "④ E-04 조기 이탈형",
      result: "",
      description: `상태: 생존
특징: 다른 시공간으로 복귀

D는 대기실이 비어 보이기 시작하자
자리에서 일어났다.

“이상하다...”

D는 문을 열고 밖으로 나왔다.
그러나 그곳은 예상치 못한 곳이었다.

▪ 후대 분석
조기 이탈형은
대기 자체를 위험으로 판단한다.
생존은 했으나
복귀 이후 적응 불가.`,
    },
    TYPE_C: {
      title: "⑤ N-05 호출 미인지형",
      result: "",
      description: `상태: 사망 추정
특징: 기록 단절

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
