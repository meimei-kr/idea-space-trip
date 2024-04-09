import SectionTitle from "@/components/elements/SectionTitle/SectionTitle";
import styles from "@/features/generate-ideas/components/ThemeSection/ThemeSection.module.scss";

export default function ThemeSection({ theme }: { theme: string | undefined }) {
  return (
    <div className={styles.theme}>
      <SectionTitle>テーマ</SectionTitle>
      <div className={styles.themeContentContainer}>
        <div className={styles.themeContent}>
          <div>{theme}</div>
        </div>
      </div>
    </div>
  );
}
