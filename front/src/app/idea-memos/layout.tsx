import styles from "@/app/idea-memos/IdeaMemos.module.scss";
import BackButton from "@/components/elements/BackButton/BackButton";

export default function IdeaMemosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>{children}</div>
      <BackButton path="/select-mode" />
    </main>
  );
}
