import styles from "@/features/generate-ideas/components/AiLoadingSection/AiLoadingSection.module.scss";

export default function AiLoadingSection() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
      <div className={styles.loaderSentence}>AIも一緒に考え中...</div>
    </div>
  );
}
