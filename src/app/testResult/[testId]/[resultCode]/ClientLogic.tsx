"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/src/store/useThemeStore";

export default function ClientLogic({ themeParam, typeParam, theme, contentType }: any) {
  const { setMode } = useThemeStore();

  useEffect(() => {
    if (themeParam && typeParam) {
      if (themeParam !== theme || typeParam !== contentType) {
        setMode(themeParam, typeParam);
      }
    }
  }, [themeParam, typeParam, theme, contentType, setMode]);

  return null;
}