"use client";

import styles from "@/app/presentation/CheckTheme/CheckThemePresentation.module.scss";
import BackButton from "@/components/elements/BackButton/BackButton";
import Button from "@/components/elements/Button/Button";
import { updateIdeaSession } from "@/lib/idea-sessions";
import { IdeaSessionType } from "@/types";
import Error from "next/error";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckThemePresentation({
  ideaSession,
}: {
  ideaSession: IdeaSessionType | null;
}) {
  const router = useRouter();
  const [statusCode, setStatusCode] = useState<number | null>(null);

  // セッションは開始されており、ideaSessionは必ず取得できる想定なので
  // nullの場合は、500エラーを返す
  if (ideaSession === null) {
    setStatusCode(500);
  }

  // ideaSessionからUUIDを取得
  const uuid = ideaSession?.uuid;
  // URLからUUIDを取得
  const uuidFromPath = usePathname().split("/")[1];

  useEffect(() => {
    // URLに含まれるUUIDがログインユーザーのものと一致するかチェック
    if (!uuid || !uuidFromPath || uuid !== uuidFromPath) {
      setStatusCode(404);
    } else {
      setStatusCode(null);
      // 遷移先パスをprefetch
      router.prefetch(`/${uuid}/theme`);
      router.prefetch(`/${uuid}/select-theme-category`);
    }
  }, [uuid, uuidFromPath]);

  const handleYesClick = async () => {
    await updateIdeaSession(uuid as string, {
      isThemeDetermined: true,
    });
    router.push(`/${uuid}/theme`);
  };

  const handleNoClick = async () => {
    await updateIdeaSession(uuid as string, {
      isThemeDetermined: false,
    });
    router.push(`/${uuid}/select-theme-category`);
  };

  // エラーがある場合はエラーページを表示
  if (statusCode) {
    return <Error statusCode={statusCode} />;
  }

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <p className={styles.question}>考えたいテーマは、すでに決まってる？</p>
        <div className={styles.buttons}>
          <Button
            onClick={handleYesClick}
            color="pink"
            size="large"
            flicker="no-flicker"
          >
            <div>YES</div>
          </Button>
          <Button
            onClick={handleNoClick}
            color="light-blue"
            size="large"
            flicker="no-flicker"
          >
            <div>NO</div>
          </Button>
        </div>
      </div>
      <div className={styles.back}>
        <BackButton />
      </div>
    </main>
  );
}
