import styles from "@/app/[uuid]/check-theme/CheckTheme.module.scss";
import BackButton from "@/components/elements/BackButton/BackButton";
import Description from "@/components/elements/Description/Description";

export default function CheckThemeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <Description>考えたいテーマは、すでに決まってる？</Description>
        {children}
      </div>
      <BackButton path="/select-mode" />
    </main>
  );
}
