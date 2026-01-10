"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/src/store/useThemeStore";

export default function ThemeTimeInitializer() {
  const { setMode } = useThemeStore();

  useEffect(() => {
    const checkAndSyncTheme = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const todayDate = now.toDateString();

      const lastAutoChange = localStorage.getItem("last-theme-auto-change");
      const [lastDate, lastType] = lastAutoChange
        ? lastAutoChange.split("|")
        : ["", ""];

      /**
       * 로직 설명:
       * 1. 현재 시간이 06시~17시 사이인데, 오늘 아침(morning)에 테마를 동기화한 기록이 없다면?
       * -> 자고 일어나서 처음 접속했거나 6시를 넘겨 접속한 것이므로 '낮'으로 강제 설정.
       * 2. 현재 시간이 18시~새벽 05시 사이인데, 오늘 저녁(evening)에 테마를 동기화한 기록이 없다면?
       * -> 퇴근 후 처음 접속했거나 18시를 넘겨 접속한 것이므로 '밤'으로 강제 설정.
       */

      // [낮 강제 구간] 아침 6시 ~ 저녁 5시 59분
      if (currentHour >= 6 && currentHour < 18) {
        if (lastDate !== todayDate || lastType !== "morning") {
          setMode("day", "test");
          localStorage.setItem(
            "last-theme-auto-change",
            `${todayDate}|morning`
          );
        }
      }
      // [밤 강제 구간] 저녁 6시 ~ 새벽 5시 59분
      else {
        // 밤 구간은 날짜가 바뀔 수 있으므로 '저녁 동기화' 여부만 체크
        if (lastDate !== todayDate || lastType !== "evening") {
          setMode("night", "test");
          localStorage.setItem(
            "last-theme-auto-change",
            `${todayDate}|evening`
          );
        }
      }
    };

    checkAndSyncTheme(); // 접속하자마자 실행

    // 접속 중일 때 정각이 되는 순간을 위해 1분마다 체크 유지
    const timer = setInterval(checkAndSyncTheme, 60000);

    return () => clearInterval(timer);
  }, [setMode]);

  return null;
}
