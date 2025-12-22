import React, { useState } from "react";
import { auth } from "./firebase"; // firebase.js 파일 경로가 맞는지 확인하세요!
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  // 1. 상태 관리: 이메일, 비밀번호, 에러 메시지
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // 2. 입력값이 바뀔 때 실행되는 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 3. 로그인 버튼 클릭 시 실행되는 함수
  const handleSubmit = async (e) => {
    e.preventDefault(); // 페이지 새로고침 방지

    try {
      // 파이어베이스 로그인 실행
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // 로그인 성공 시 로직
      console.log("로그인 성공 유저:", userCredential.user);
      setError(""); // 기존 에러 초기화
      alert(`반가워요! ${formData.email}님.`);

      // 메인으로 이동
      navigate("/");
    } catch (err) {
      // 로그인 실패 시 로직 (에러 메시지 한글화)
      console.error("Firebase Error:", err.code);

      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password" ||
        err.code === "auth/invalid-credential"
      ) {
        setError("이메일 또는 비밀번호가 일치하지 않습니다.");
      } else if (err.code === "auth/invalid-email") {
        setError("올바른 이메일 형식이 아닙니다.");
      } else {
        setError("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2>Pickle Test 로그인</h2>
        <p style={{ color: "#666", fontSize: "14px" }}>
          테스트를 위해 로그인이 필요합니다.
        </p>

        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputGroupStyle}>
            <label>이메일</label>
            <input
              type="email" // 이메일 전용 키보드 및 형식 체크
              name="email"
              placeholder="example@email.com"
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

          {/* 에러 발생 시에만 노출 */}
          {error && <p style={errorTextStyle}>{error}</p>}

          <button type="submit" style={buttonStyle}>
            로그인하기
          </button>
        </form>
        <p style={{ marginTop: "15px", fontSize: "13px" }}>
          계정이 없으신가요?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{ color: "#4CAF50", cursor: "pointer" }}
          >
            회원가입
          </span>
        </p>
      </div>
    </div>
  );
};

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

export default Login;
