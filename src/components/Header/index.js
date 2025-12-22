import React from "react";
import Link from "next/link"; // react-router-dom 대신 next/link 사용
import "./index.css";

function Header() {
  return (
    <header>
      <div className="header_top_bar">
        {/* Next.js에서는 외부 링크가 아니면 Link 태그 사용 권장 */}
        <Link href="/">
          당신은 어떤 피클일까요? 개성을 톡 쏘게, 지금 바로 Test~!
        </Link>
      </div>
    </header>
  );
}

export default Header;
