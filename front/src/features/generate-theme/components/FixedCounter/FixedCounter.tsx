import styles from "@/features/generate-theme/components/FixedCounter/FixedCounter.module.scss";

export default function FixedCounter({ count }: { count: number }) {
  return (
    <div className={styles.count}>
      <span>{count}個 </span>
      アイデアが浮かんだよ！
    </div>
  );
}
