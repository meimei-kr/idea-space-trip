import styles from "@/app/idea-memos/(show)/[uuid]/IdeaMemosUuid.module.scss";
import BackButton from "@/components/elements/BackButton/BackButton";

export default function IdeaMemosUuidLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>{children}</div>
      </div>
      <BackButton path="/idea-memos" />
    </main>
  );
}
