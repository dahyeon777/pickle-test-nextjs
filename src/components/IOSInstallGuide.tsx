"use client";

import React, { useEffect, useState } from "react";

const IOSInstallGuide = () => {
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;

    if (isIOS && !isStandalone) {
      setShowGuide(true);
    }
  }, []);

  if (!showGuide) return null;

  return (
    <div className="ios-guide-overlay">
      <div className="ios-guide-box">
        <button className="close-btn" onClick={() => setShowGuide(false)}>
          ×
        </button>
        <p className="guide-text">
          <strong>앱으로 더 편하게 즐기세요!</strong>
          <br />
          Safari 하단의 <span className="share-icon">⎋</span> 버튼을 누르고
          <br />
          <strong>'홈 화면에 추가'</strong>를 클릭하세요.
        </p>
        <div className="arrow-down"></div>
      </div>
      <style jsx>{`
        .ios-guide-overlay {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9999;
          width: 90%;
          max-width: 320px;
        }
        .ios-guide-box {
          background: white;
          color: #333;
          padding: 15px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          text-align: center;
          position: relative;
          border: 2px solid #47753a;
        }
        .close-btn {
          position: absolute;
          top: 5px;
          right: 8px;
          border: none;
          background: none;
          font-size: 18px;
          color: #888;
        }
        .guide-text {
          font-size: 0.9rem;
          line-height: 1.5;
          margin: 0;
          color: #333;
        }
        .share-icon {
          font-size: 1.1rem;
          color: #007aff;
          font-weight: bold;
        }
        .arrow-down {
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 10px solid #47753a;
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
        }
      `}</style>
    </div>
  );
};

export default IOSInstallGuide;
