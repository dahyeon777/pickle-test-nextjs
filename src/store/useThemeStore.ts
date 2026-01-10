import { create } from "zustand";
import { persist } from "zustand/middleware";

// 상태 타입 정의
// contentType에 'book'을 추가하여 썰북 모드를 구분합니다.
interface ThemeState {
  theme: "day" | "night";
  contentType: "test" | "taro" | "book";

  setTheme: (theme: "day" | "night") => void;
  setContentType: (type: "test" | "taro" | "book") => void;

  // 모드 설정 시 테마와 콘텐츠 타입을 한 번에 변경
  setMode: (theme: "day" | "night", type: "test" | "taro" | "book") => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "day",
      contentType: "test",

      setTheme: (theme) => set({ theme }),
      setContentType: (type) => set({ contentType: type }),

      setMode: (theme, type) =>
        set({
          theme,
          contentType: type,
        }),
    }),
    {
      name: "theme-storage",
    }
  )
);
