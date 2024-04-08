import styles from "@/app/[uuid]/generate-theme/GenerateTheme.module.scss";

export default function GenerateThemeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className={styles.wrapper}>{children}</main>;
}
