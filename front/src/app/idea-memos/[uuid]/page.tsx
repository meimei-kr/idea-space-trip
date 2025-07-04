import styles from "@/app/idea-memos/[uuid]/IdeaMemosUuid.module.scss";
import BackButton from "@/components/elements/BackButton/BackButton";
import IdeaMemoCardHeader from "@/components/elements/IdeaMemoCardHeader/IdeaMemoCardHeader";
import { IdeaMemoCardContent } from "@/features/idea-memos-uuid/components";
import { getIdeaMemo } from "@/lib/idea-memos";

export default async function page({ params }: { params: { uuid: string } }) {
  const ideaMemo = await getIdeaMemo(params.uuid);
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.cardContainer}>
            <IdeaMemoCardHeader ideaMemo={ideaMemo} />
            <IdeaMemoCardContent ideaMemo={ideaMemo} />
          </div>
        </div>
      </div>
      <BackButton path="/idea-memos" />
    </main>
  );
}
