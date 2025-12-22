import React, { useState } from "react";
import { auth } from "./firebase"; // firebase.js 파일 경로 확인!
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "", // 비밀번호 확인 추가
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. 비밀번호 일치 확인 (프론트엔드 유효성 검사)
    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호가 서로 일치하지 않습니다.");
      return;
    }

    try {
      // 2. 파이어베이스 회원가입 함수 실행
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      console.log("회원가입 성공:", userCredential.user);
      alert("회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.");
      navigate("/login"); // 가입 후 로그인 창으로 보냄
    } catch (err) {
      console.error("Signup Error:", err.code);
      // 에러 한글화
      if (err.code === "auth/email-already-in-use") {
        setError("이미 사용 중인 이메일입니다.");
      } else if (err.code === "auth/weak-password") {
        setError("비밀번호는 최소 6자 이상이어야 합니다.");
      } else {
        setError("회원가입 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ color: "#4CAF50" }}>Pickle Test 회원가입</h2>
        <p style={{ color: "#666", fontSize: "14px" }}>
          나만의 피클 캐릭터를 만나보세요!
        </p>

        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputGroupStyle}>
            <label>이메일 주소</label>
            <input
              type="email"
              name="email"
              placeholder="pickle@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label>비밀번호</label>
            <input
              type="password"
              name="password"
              placeholder="6자 이상 입력"
              value={formData.password}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label>비밀번호 확인</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="한 번 더 입력해주세요"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          {error && <p style={errorTextStyle}>{error}</p>}

          <button type="submit" style={buttonStyle}>
            가입하기
          </button>
        </form>

        <p style={{ marginTop: "15px", fontSize: "13px" }}>
          이미 계정이 있으신가요?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ color: "#4CAF50", cursor: "pointer", fontWeight: "bold" }}
          >
            로그인
          </span>
        </p>
      </div>
    </div>
  );
};

// 스타일 (로그인 창과 동일하게 유지하여 통일감 부여)
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "none",
};
const cardStyle = {
  padding: "40px",
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  width: "100%",
  maxWidth: "400px",
  textAlign: "center",
};
const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  marginTop: "20px",
};
const inputGroupStyle = {
  textAlign: "left",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
};
const inputStyle = {
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #ddd",
  fontSize: "16px",
};
const buttonStyle = {
  padding: "12px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#4CAF50",
  color: "white",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "10px",
};
const errorTextStyle = {
  color: "#ff4d4d",
  fontSize: "13px",
  margin: "0",
  fontWeight: "bold",
};

export default Signup;
