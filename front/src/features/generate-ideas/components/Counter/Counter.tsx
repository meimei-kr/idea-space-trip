import styles from "@/features/generate-ideas/components/Counter/Counter.module.scss";

export default function Counter({ count }: { count: number }) {
  return (
    <div className={styles.mobileCount}>
      <span>{count}個 </span>アイデアが浮かんだよ！
    </div>
  );
}
