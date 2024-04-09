import styles from "@/features/end-session/components/ResultThisSession/ResultThisSession.module.scss";
import { IdeaMemoType } from "@/types";

export default function ResultThisSession({
  ideaMemos,
}: {
  ideaMemos: IdeaMemoType[] | null;
}) {
  return (
    <div className={styles.resultContainer}>
      <div className={styles.resultTitle}>
        今回のセッションで出たアイデアの数
      </div>
      <div className={styles.resultCount}>
        <span>{ideaMemos?.length || 0}</span> 個
      </div>
    </div>
  );
}
