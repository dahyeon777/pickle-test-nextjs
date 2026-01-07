import React from "react";

export default function PrivacyPolicy() {
  const siteName = "피클테스트";
  const email = "contact.pickletest@gmail.com";
  const date = "2026년 1월 7일";

  return (
    <main className="max-w-3xl mx-auto py-20 px-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-8 text-black border-b pb-4">
        개인정보 처리방침
      </h1>

      <section className="space-y-10 text-sm leading-relaxed">
        <div>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">
            1. 개인정보의 처리 목적 및 수집 항목
          </h2>
          <p>
            본 서비스({siteName})는 이용자의 성명, 연락처 등 직접적인 개인정보를
            서버에 저장하거나 별도로 수집하지 않습니다. 다만, 이용자의 서비스
            이용 과정에서 서비스 개선 및 맞춤형 광고 제공을 위해 아래와 같은
            정보가 자동 생성되어 수집될 수 있습니다.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              자동 수집 항목: IP 주소, 쿠키, 서비스 이용 기록, 기기 정보, 방문
              기록
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">
            2. 제3자 서비스에 의한 데이터 처리 (쿠키 등)
          </h2>
          <p className="mb-4">
            본 서비스는 서비스 분석 및 광고 게재를 위해 외부 전문 서비스의
            기술을 사용하며, 이 과정에서 해당 업체가 정보를 수집할 수 있습니다.
          </p>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <p className="font-bold text-blue-600 mb-1">
                Google (Analytics, AdSense)
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>
                  <strong>목적:</strong> 웹사이트 이용 행태 분석 및 사용자
                  맞춤형 광고 게재
                </li>
                <li>
                  <strong>항목:</strong> 쿠키 기반 방문 기록 및 광고 클릭
                  데이터, IP 정보
                </li>
                <li>
                  <strong>보유 기간:</strong> Google의 개인정보 관리 정책에 따름
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <p className="font-bold text-orange-600 mb-1">Coupang Partners</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>
                  <strong>목적:</strong> 제휴 광고 노출 및 광고 클릭을 통한 수익
                  정산
                </li>
                <li>
                  <strong>항목:</strong> 광고 식별 정보 및 쿠키 데이터
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <p className="font-bold text-yellow-600 mb-1">
                Kakao (카카오톡 공유)
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>
                  <strong>목적:</strong> 콘텐츠 공유 기능 제공
                </li>
                <li>
                  <strong>항목:</strong> 공유한 콘텐츠 정보 및 기기 정보
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">
            3. 개인정보의 보유 및 이용기간
          </h2>
          <p>
            본 서비스는 직접 개인정보를 보관하지 않으므로 파기 절차가 해당되지
            않습니다. 단, 제3자 서비스(Google 등)가 수집한 정보는 해당 서비스의
            운영 정책에 따라 관리 및 파기됩니다.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">
            4. 이용자의 권리 및 거부 방법
          </h2>
          <p>
            이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 웹브라우저 옵션
            설정을 통해 모든 쿠키를 허용하거나, 거부할 수 있습니다.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li>
              <strong>Chrome:</strong> 설정 {">"} 개인정보 및 보안 {">"} 쿠키 및
              기타 사이트 데이터
            </li>
            <li>
              <strong>Google 애널리틱스 차단:</strong>{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline"
              >
                차단 도구 설치
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">
            5. 개인정보 보호책임자
          </h2>
          <p>
            서비스 이용 중 발생하는 문의사항은 아래 연락처로 문의해 주시기
            바랍니다.
          </p>
          <p className="mt-2 font-medium p-3 bg-gray-50 rounded w-fit">
            이메일: {email}
          </p>
        </div>

        <div className="pt-8 border-t border-gray-200 text-gray-500 text-xs">
          <p>공고일자/시행일자: {date}</p>
        </div>
      </section>
    </main>
  );
}
