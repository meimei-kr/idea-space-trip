"use client";

import styles from "@/components/Button/Button.module.scss";
import { ButtonType } from "@/types/Button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Button({
  children,
  color,
  size,
  type,
  href,
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
      className={`${styles.button} ${styles[color]} ${styles[size]}`}
      onClick={handleClick}
      type={type}
    >
      {children}
    </button>
  );
}
