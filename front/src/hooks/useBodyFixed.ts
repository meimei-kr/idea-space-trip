"use client";

import { useEffect, useRef, useState } from "react";

const isIOSUserAgent = () => {
  const ua = window.navigator.userAgent.toLowerCase();
  const isIOS =
    ua.indexOf("iphone") > -1 ||
    ua.indexOf("ipad") > -1 ||
    (ua.indexOf("macintosh") > -1 && "ontouchend" in document);
  return isIOS;
};

export const useBodyFixed = () => {
  const [bodyFixed, setBodyFixed] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  // コンポーネントのライフサイクル全体で保持される値なので、初回レンダリングかどうか追跡できるようになる
  const isFirstRender = useRef(false);

  useEffect(() => {
    // 初回レンダリング時は発火しないようにする
    if (!isFirstRender.current) {
      isFirstRender.current = true;
      return;
    }

    const body = document.querySelector("body");
    if (!body) return;

    const isIOS = isIOSUserAgent();

    if (bodyFixed) {
      if (isIOS) {
        setScrollPosition(window.scrollY);
        body.style.position = "fixed";
        body.style.top = `-${scrollPosition}px`;
      } else {
        body.style.overflow = "hidden";
      }
    } else {
      if (isIOS) {
        body.style.removeProperty("position");
        body.style.removeProperty("top");
        window.scrollTo(0, scrollPosition);
      } else {
        body.style.removeProperty("overflow");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bodyFixed]);

  return { bodyFixed, setBodyFixed };
};
