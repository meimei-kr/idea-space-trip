import styles from "@/app/[uuid]/check-theme/CheckTheme.module.scss";
import BackButton from "@/components/elements/BackButton/BackButton";
import Description from "@/components/elements/Description/Description";
import * as CheckTheme from "@/features/check-theme/components";
import { getIdeaSessionInProgress } from "@/lib/idea-sessions";

export default async function page() {
  const ideaSession = await getIdeaSessionInProgress();
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <Description>考えたいテーマは、すでに決まってる？</Description>
        <CheckTheme.Buttons ideaSession={ideaSession} />
      </div>
      <BackButton path="/select-mode" />
    </main>
  );
}
