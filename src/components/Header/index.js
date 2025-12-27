import React from "react";
import Link from "next/link";
import "./index.css";

// 1. { isNight }를 인자로 받아야 부모가 보내는 상태를 읽을 수 있습니다.
function Header({ isNight }) {
  return (
    // 2. isNight가 true이면 'night_mode'라는 클래스 이름을 추가합니다.
    <header className={isNight ? "night_mode" : ""}>
      <div className="header_top_bar">
        <Link href="/">
          당신은 어떤 피클일까요? 개성을 톡 쏘게, 지금 바로 Test~!
        </Link>
      </div>
    </header>
  );
}

export default Header;