"use client";

import styles from "@/components/elements/Button/Button.module.scss";
import { ButtonType } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Button({
  children,
  color,
  size,
  type,
  href,
  flicker,
}: ButtonType) {
  const router = useRouter();
  const handleClick = () => {
    if (type === "button" && href) {
      router.push(href);
    }
  };

  useEffect(() => {
    if (!href) return;
    router.prefetch(href);
  }, [router, href]);

  return (
    <button
      className={`${styles[color]} ${styles[size]} ${styles[flicker]}`}
      onClick={handleClick}
      type={type}
    >
      {children}
    </button>
  );
}
