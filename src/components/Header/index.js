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
      <nav className="main_nav">
        <ul>
          <li>
            {/* public/icon_1.png 에 이미지를 넣었다고 가정할 때 경로입니다 */}
            <img
              src="/img/icon_1.png"
              width="30px"
              height="30px"
              alt="아이콘"
            />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
