import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 상태 타입 정의
interface ThemeState {
  theme: 'day' | 'night'; // 큰 틀 (낮/밤)
  contentType: 'test' | 'taro'; // 그 안의 내용물 (일반/타로)
  
  // 상태 변경 함수들
  setTheme: (theme: 'day' | 'night') => void;
  setContentType: (type: 'test' | 'taro') => void;
  
  // 한 번에 둘 다 설정해야 할 때 (예: 메인에서 카드 클릭 시)
  setMode: (theme: 'day' | 'night', type: 'test' | 'taro') => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'day', // 기본값 낮
      contentType: 'test', // 기본값 일반 테스트
      
      setTheme: (theme) => set({ theme }),
      setContentType: (type) => set({ contentType: type }),
      
      setMode: (theme, type) => set({ theme, contentType: type }),
    }),
    {
      name: 'theme-storage',
    }
  )
);