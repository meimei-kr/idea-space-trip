"use client";

import styles from "@/components/Button/Button.module.scss";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type ButtonProps = {
  children: React.ReactNode;
  color: "pink";
  size: "large";
  type: "button" | "submit";
  href?: string;
  onClick?: () => void;
};

export default function Button({
  children,
  color,
  size,
  type,
  href,
  onClick,
}: ButtonProps) {
  const router = useRouter();
  const handleClick = () => {
    if (type === "button" && href) {
      router.push(href);
    } else if (onClick) {
      onClick();
    }
  };

  useEffect(() => {
    if (href) {
      router.prefetch(href);
    }
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
