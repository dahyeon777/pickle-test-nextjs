# 🥒 Pickle Test (피클 테스트)
심리테스트 플랫폼

[pickletest.com](https://pickletest.com) 


![Image](https://github.com/user-attachments/assets/6c48966d-9356-4484-a3cd-bbf7bab182c5)


---

## 📅 프로젝트 개요
- **개발 기간**: 2025.11 ~ 2026.01 (개인 프로젝트)
- **핵심 목표**: 반복되는 코드 없이 데이터 기반으로 수많은 테스트를 생성할 수 있는 **확장성 있는 구조 설계**

## 🛠 Tech Stack
- **Framework**: Next.js (App Router)
- **State Management**: Zustand, useState
- **Styling**: CSS3 (Responsive Design)
- **Deployment & Infra**: Cloudflare, PWA
- **Libraries**: html-to-image, Kakao SDK

---

## 🚀 핵심 구현 사항 (Technical Experience)

### 1. 데이터 중심의 동적 라우팅 및 확장성 설계
- **동적 라우팅 (Dynamic Routing)**: 각 테스트마다 페이지를 개별 제작하지 않고, 고유 ID 파라미터를 받아 하나의 **템플릿 컴포넌트**에서 데이터를 동적으로 바인딩하도록 구현했습니다.
- **JSON 데이터 구조화**: 질문과 선택지 데이터를 JSON으로 표준화하여 관리함으로써, **코드 수정 없이 JSON 파일 추가만으로 새로운 테스트를 출시**할 수 있는 확장성을 확보했습니다.

### 2. 효율적인 상태 관리 및 알고리즘
- **Zustand 기반 테마 제어**: Day/Night 테마에 따라 전체 UI 스타일과 `taro | test | book` 데이터셋을 전역에서 유기적으로 변경합니다.
- **테마별 분석 알고리즘**: 사용자 답변 성향 점수를 실시간 합산하고, 지표 조합을 통해 결과를 도출하는 함수를 테마별 특성에 맞춰 다르게 설계했습니다.
- **UX 예외 처리**: `useState`로 진행도와 점수를 관리하며, 선택 완료 시에만 다음 단계로 이동하게끔 방어 로직을 구축했습니다.

### 3. 모바일 사용자 경험(UX) 극대화 및 PWA
- **PWA 환경 구축**: Web App Manifest를 설정하여 네이티브 앱과 유사한 홈 화면 추가 기능을 제공합니다.
- **iOS 최적화**: 자동 설치 팝업이 없는 iOS 환경을 위해 **직접 `IOSInstallGuide` 컴포넌트를 구현**하여 설치 전환율과 재방문율을 높였습니다.

### 4. 부가 기능 및 공유 시스템
- **공유 최적화**: `navigator.clipboard`를 통한 URL 복사 및 **Kakao SDK** 연동으로 친구 공유 기능을 구현했습니다.
- **결과 이미지 저장**: `html-to-image` 라이브러리를 활용해 사용자 결과 화면을 이미지 파일로 즉시 저장하는 기능을 제공합니다.
- **시각적 요소**: 전체 질문 수 대비 현재 진행도를 보여주는 **프로그레스 바**와 태그 기반 **검색 기능**을 추가했습니다.


