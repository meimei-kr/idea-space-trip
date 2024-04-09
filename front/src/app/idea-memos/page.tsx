import styles from "@/app/idea-memos/IdeaMemos.module.scss";
import BackButton from "@/components/elements/BackButton/BackButton";
import * as IdeaMemos from "@/features/idea-memos/components";
import { getAllIdeaMemos } from "@/lib/idea-memos";
import { IdeaMemoType } from "@/types";

export default async function page() {
  const ideaMemos: IdeaMemoType[] = await getAllIdeaMemos();

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        {ideaMemos.length === 0 ? (
          <IdeaMemos.NoMemoDisplay />
        ) : (
          <IdeaMemos.MemosDisplay ideaMemos={ideaMemos} />
        )}
      </div>
      <BackButton path="/select-mode" />
    </main>
  );
}
