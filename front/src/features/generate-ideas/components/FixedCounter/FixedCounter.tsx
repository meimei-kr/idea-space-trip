import styles from "@/features/generate-ideas/components/FixedCounter/FixedCounter.module.scss";

export default function FixedCounter({ count }: { count: number }) {
  return (
    <div className={styles.count}>
      <span>{count}個 </span>
      アイデアが浮かんだよ！
    </div>
  );
}
