import styles from "@/app/[uuid]/select-theme-category/SelectThemeCategory.module.scss"; // prettier-ignore
import BackButton from "@/components/elements/BackButton/BackButton";
import Description from "@/components/elements/Description/Description";
import SelectForm from "@/features/select-theme/components/SelectForm/SelectForm";
import { getIdeaSessionInProgress } from "@/lib/idea-sessions";

export default async function page({ params }: { params: { uuid: string } }) {
  const ideaSession = await getIdeaSessionInProgress();
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Description>どの発明家になってみる？</Description>
          <SelectForm ideaSession={ideaSession} />
        </div>
      </div>
      <BackButton path={`/${params.uuid}/check-theme`} />
    </main>
  );
}
