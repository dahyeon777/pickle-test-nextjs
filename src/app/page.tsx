"use client";
export const runtime = "edge";

import FirstPage from "./FirstPage/page";

export default function Home() {
  return (
    <div>
      <FirstPage />;
    </div>
  );
}
