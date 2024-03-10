"use client";

import styles from "@/components/elements/LinkButton/LinkButton.module.scss";
import { LinkButtonProps } from "@/types";
import Link from "next/link";

export default function LinkButton({
  children,
  href,
  color,
  size,
  flicker,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={`${styles[color]} ${styles[size]} ${styles[flicker]}`}
    >
      {children}
    </Link>
  );
}
