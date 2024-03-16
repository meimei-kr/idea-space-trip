import styles from "@/components/elements/Description/Description.module.scss";
import { PropsWithChildren } from "react";

export default function Description({ children }: PropsWithChildren) {
  return (
    <div className={styles.container}>
      <div className={styles.description}>{children}</div>
    </div>
  );
}
