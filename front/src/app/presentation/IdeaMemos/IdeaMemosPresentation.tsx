import styles from "@/app/presentation/IdeaMemos/IdeaMemosPresentation.module.scss";
import IdeaMemoCard from "@/components/elements/IdeaMemoCard/IdeaMemoCard";
import { IdeaMemoType } from "@/types";

export default function IdeaMemosPresentation({
  ideaMemos,
}: {
  ideaMemos: IdeaMemoType[];
}) {
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          {ideaMemos.length === 0 ? (
            <div>
              <div>まだアイデアメモがないよ。</div>
            </div>
          ) : (
            ideaMemos.map((memo) => (
              <IdeaMemoCard key={memo.uuid} ideaMemo={memo} />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
