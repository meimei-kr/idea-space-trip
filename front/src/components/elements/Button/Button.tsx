import styles from "@/components/elements/Button/Button.module.scss";
import type { ButtonProps } from "@/types/index";

export default function Button({
  children,
  onClick,
  color,
  size,
  flicker,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${styles[color]} ${styles[size]} ${styles[flicker]}`}
    >
      {children}
    </button>
  );
}
