/* src/app/page.tsx */
"use client";

import { useState } from "react";
import FirstPage from "./FirstPage/page";
import Header from "../components/Header"; // 헤더 임포트

export default function Page() {
  const [isNight, setIsNight] = useState(false);

  const toggleMode = () => {
    setIsNight(!isNight);
  };

  return (
    <div>
      {/* 1. 이제 상태를 아는 헤더가 여기에 위치합니다 */}
      <Header isNight={isNight} />

      {/* 2. 메인 컨텐츠인 FirstPage에도 상태를 넘겨줍니다 */}
      <FirstPage isNight={isNight} toggleMode={toggleMode} />
    </div>
  );
}
