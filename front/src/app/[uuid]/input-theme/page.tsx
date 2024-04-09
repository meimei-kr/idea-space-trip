import styles from "@/app/[uuid]/input-theme/InputTheme.module.scss";
import BackButton from "@/components/elements/BackButton/BackButton";
import Description from "@/components/elements/Description/Description";
import * as InputTheme from "@/features/input-theme/components";
import { getIdeaSessionInProgress } from "@/lib/idea-sessions";

export default async function page({ params }: { params: { uuid: string } }) {
  const ideaSession = await getIdeaSessionInProgress();

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Description>アイデア出しのテーマを入力してね</Description>
          <InputTheme.Form ideaSession={ideaSession} />
        </div>
      </div>
      <BackButton path={`/${params.uuid}/check-theme`} />
    </main>
  );
}
