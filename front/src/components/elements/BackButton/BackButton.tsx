import styles from "@/components/elements/BackButton/BackButton.module.scss";
import Link from "next/link";

export default function BackButton() {
  return (
    <Link href="/select-mode" className={styles.button}>
      <div className={styles.arrow}>⬅</div>
      <div className={styles.back}>BACK</div>
    </Link>
  );
}
