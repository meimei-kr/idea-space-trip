import styles from "@/app/[uuid]/input-theme/InputTheme.module.scss";

export default function InputThemeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className={styles.wrapper}>{children}</main>;
}
