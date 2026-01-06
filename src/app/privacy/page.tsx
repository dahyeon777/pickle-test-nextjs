// app/privacy/page.tsx
import React from 'react';

export default function PrivacyPolicy() {
  const siteName = "피클테스트";
  const email = "contact.pickletest@gmail.com";
  const date = "2026년 1월 6일"; 

  return (
    <main className="max-w-3xl mx-auto py-20 px-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-8 text-black">개인정보 처리방침</h1>
      
      <section className="space-y-6 text-sm leading-relaxed">
        <div>
          <h2 className="text-xl font-semibold mb-2">1. 개인정보의 처리 및 수집</h2>
          <p>
            본 서비스({siteName})는 이용자의 개인정보를 직접 수집하거나 서버에 저장하지 않습니다. 
            모든 데이터는 이용자의 기기 내에서 처리되거나, 아래의 제3자 서비스를 통해서만 처리됩니다.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">2. 제3자 서비스에 의한 자동 수집</h2>
          <p className="mb-2">본 서비스는 광고 게재 및 방문 분석을 위해 Google의 서비스를 이용합니다.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>수집 주체:</strong> Google LLC</li>
            <li><strong>수집 항목:</strong> 쿠키(Cookie), IP 주소, 브라우저 정보, 서비스 이용 기록</li>
            <li><strong>수집 목적:</strong> 사용자 맞춤형 광고 게재 및 웹사이트 트래픽 분석</li>
            <li><strong>거부 방법:</strong> 이용자는 브라우저 설정에서 쿠키 저장을 거부할 수 있습니다.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">3. 외부 서비스 링크 (카카오톡 공유 등)</h2>
          <p>
            카카오톡 공유 기능은 이용자가 선택한 정보를 전달하기 위한 링크 도구이며, 
            본 서비스는 이 과정에서 어떠한 개인정보도 수집하거나 열람하지 않습니다.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">4. 개인정보 보호책임자</h2>
          <p>문의사항은 아래 이메일로 연락주시기 바랍니다.</p>
          <p className="mt-1 font-medium italic">이메일: {email}</p>
        </div>

        <div className="pt-6 border-t border-gray-200 text-gray-500">
          <p>시행일: {date}</p>
        </div>
      </section>
    </main>
  );
}