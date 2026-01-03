import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 상태 타입 정의
interface ThemeState {
  isHorror: boolean; // false면 낮(일반), true면 밤(호러)
  toggleTheme: () => void; // 상태를 반전시키는 함수
  setTheme: (mode: 'normal' | 'horror') => void; // 특정 모드로 고정하는 함수
}

export const useThemeStore = create<ThemeState>()(
  // persist 미니웨어를 사용하면 페이지를 새로고침해도 상태가 유지됩니다.
  persist(
    (set) => ({
      isHorror: false, // 기본값은 낮 모드
      toggleTheme: () => set((state) => ({ isHorror: !state.isHorror })),
      setTheme: (mode) => set({ isHorror: mode === 'horror' }),
    }),
    {
      name: 'theme-storage', // 로컬 스토리지에 저장될 키 이름
    }
  )
);