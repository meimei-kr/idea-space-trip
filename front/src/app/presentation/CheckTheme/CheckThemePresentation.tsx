"use client";

import styles from "@/app/presentation/CheckTheme/CheckThemePresentation.module.scss";
import BackButton from "@/components/elements/BackButton/BackButton";
import Button from "@/components/elements/Button/Button";
import { useUUIDCheck } from "@/hooks/useUUIDCheck";
import { updateIdeaSession } from "@/lib/idea-sessions";
import { IdeaSessionType } from "@/types";
import Error from "next/error";
import { useRouter } from "next/navigation";

export default function CheckThemePresentation({
  ideaSession,
}: {
  ideaSession: IdeaSessionType | null;
}) {
  const router = useRouter();
  const { uuid, statusCode } = useUUIDCheck({ ideaSession });

  const handleYesClick = async () => {
    await updateIdeaSession(uuid as string, {
      isThemeDetermined: true,
    });
    router.push(`/${uuid}/input-theme`);
  };

  const handleNoClick = async () => {
    await updateIdeaSession(uuid as string, {
      isThemeDetermined: false,
    });
    router.push(`/${uuid}/select-theme-category`);
  };

  const handleBack = () => {
    router.push(`/select-mode`);
  };

  // エラーがある場合はエラーページを表示
  if (statusCode >= 400) {
    return <Error statusCode={statusCode} />;
  }

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <p className={styles.question}>考えたいテーマは、すでに決まってる？</p>
        <div className={styles.buttons}>
          <Button onClick={handleYesClick} color="pink" size="large">
            <div>YES</div>
          </Button>
          <Button onClick={handleNoClick} color="light-blue" size="large">
            <div>NO</div>
          </Button>
        </div>
      </div>
      <BackButton onClick={handleBack} />
    </main>
  );
}
