import styles from "@/features/end-session/components/ResultThisMonth/ResultThisMonth.module.scss";

export default function ResultThisMonth({
  ideaMemosCountThisMonth,
}: {
  ideaMemosCountThisMonth: number;
}) {
  return (
    <div className={styles.resultContainer}>
      <div className={styles.resultTitle}>今月出したアイデアの総数</div>
      <div className={styles.resultCount}>
        <span>{ideaMemosCountThisMonth}</span> 個
      </div>
    </div>
  );
}
