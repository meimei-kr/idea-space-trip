import styles from "@/features/generate-theme/components/ThemesDisplay/ThemesDisplay.module.scss";

export default function ThemesDisplay({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.themesGenerated}>
      <p className={styles.themesSuggestion}>こんなテーマはどうかな？</p>
      {children}
    </div>
  );
}
