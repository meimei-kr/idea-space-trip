"use client";

import { createContext, useContext, useState } from "react";

// タッチイベントのコンテキストを作成
const TouchContext = createContext({
  isTouched: false,
  handleTouchStart: () => {},
  handleTouchEnd: () => {},
});

export const TouchProvider = ({ children }: { children: React.ReactNode }) => {
  const [isTouched, setIsTouched] = useState(false);

  // タッチイベントの状態を変更する関数
  const handleTouchStart = () => setIsTouched(true);
  const handleTouchEnd = () => setIsTouched(false);

  return (
    <TouchContext.Provider
      value={{ isTouched, handleTouchStart, handleTouchEnd }}
    >
      {children}
    </TouchContext.Provider>
  );
};

export const useTouch = () => useContext(TouchContext);
