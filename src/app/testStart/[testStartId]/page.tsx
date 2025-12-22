"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation"; // Next.js 전용 훅
import RadioOption from "../../../components/RadioOption";
import ProgressBar from "../../../components/ProgressBar";
import { AllTestQuestionsData } from "../../../TestData";
import styles from "./page.module.css";

// 결과 MBTI 계산 함수
function calculateMbti(scores: any) {
  const E_I = scores.E_score >= scores.I_score ? "E" : "I";
  const S_N = scores.S_score >= scores.N_score ? "S" : "N";
  const T_F = scores.T_score >= scores.F_score ? "T" : "F";
  const J_P = scores.J_score >= scores.P_score ? "J" : "P";

  return E_I + S_N + T_F + J_P;
}

function TestStartPage() {
  const router = useRouter();
  const params = useParams();

  const testStartId = params.testStartId;
  const isToFind = Number(testStartId);
  const nowTest = AllTestQuestionsData.find((test) => test.id === isToFind);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const [score, setScore] = useState({
    E_score: 0,
    I_score: 0,
    S_score: 0,
    N_score: 0,
    T_score: 0,
    F_score: 0,
    J_score: 0,
    P_score: 0,
  });

  const nowQuestion = nowTest ? nowTest.questions[questionIndex] : null;

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  function nextquestion() {
    if (!selectedOption || !nowQuestion) return;

    const selected = nowQuestion.options.find(
      (opt) => opt.optionId === selectedOption
    );

    if (!selected || !selected.score) return;

    // 점수 업데이트 (함수형 업데이트 사용으로 최신 상태 유지)
    const currentScore = { ...score };
    for (const axis in selected.score) {
      // @ts-ignore
      currentScore[axis] += selected.score[axis];
    }
    setScore(currentScore);

    const nextIndex = questionIndex + 1;

    if (nowTest && nextIndex < nowTest.questions.length) {
      setQuestionIndex(nextIndex);
      setSelectedOption(null);
    } else {
      // 마지막 질문이면 MBTI 계산 후 결과 페이지로 이동
      const finalMbti = calculateMbti(currentScore);
      // 아까 만든 결과 페이지 주소 규칙: /testResult/[id]/[result]
      router.push(`/testResult/${isToFind}/${finalMbti}`);
    }
  }

  if (!nowTest) return <div>테스트를 찾을 수 없습니다.</div>;
  if (!nowQuestion) return <div>결과를 계산 중입니다...</div>;

  const totalQuestions = nowTest.questions.length;
  const currentProgress = questionIndex + 1;

  return (
    <div className={styles.container}>
      <ProgressBar current={currentProgress} total={totalQuestions} />

      <div className={styles.radio_frame}>
        <h2 className={styles.answer_title}>{nowTest.title}</h2>
        <h3 className={styles.question_text}>
          Q{nowQuestion.questionId}. {nowQuestion.text}
        </h3>

        <div className={styles.options_container}>
          {nowQuestion.options.map((option) => (
            <RadioOption
              key={option.optionId}
              optionId={option.optionId}
              text={option.text}
              name={`question-${nowQuestion.questionId}`}
              onChange={handleOptionChange}
              checked={selectedOption === option.optionId}
            />
          ))}
        </div>
      </div>

      <button
        style={buttonStyle}
        disabled={!selectedOption}
        onClick={nextquestion}
      >
        {questionIndex === nowTest.questions.length - 1
          ? "결과 확인하기"
          : "다음 질문"}
      </button>
    </div>
  );
}

export default TestStartPage;

const buttonStyle = {
  padding: "12px",
  borderRadius: "6px",
  border: "none",
  width: "300px",
  backgroundColor: "#4CAF50",
  color: "white",
  fontSize: "16px",
  fontWeight: "bold" as const,
  cursor: "pointer",
  marginTop: "10px",
};
