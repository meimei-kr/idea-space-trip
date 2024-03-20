import styles from "@/components/elements/Button/Button.module.scss";
import type { ButtonProps } from "@/types/index";

export default function Button({
  children,
  onClick,
  color,
  size,
}: ButtonProps) {
  return (
    <button onClick={onClick} className={`${styles[color]} ${styles[size]}`}>
      {children}
    </button>
  );
}
