import styles from "@/features/idea-memos/components/NoMemoDisplay/NoMemoDisplay.module.scss";
import Aliens from "public/images/aliens.svg";

export default function NoMemoDisplay() {
  return (
    <div className={styles.noDataContainer}>
      <div className={styles.message}>
        <div>まだアイデアメモがないよ。</div>
        <Aliens className={styles.svg} />
      </div>
    </div>
  );
}
