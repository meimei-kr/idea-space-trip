"use client";

import styles from "@/app/presentation/CheckTheme/CheckThemePresentation.module.scss";
import BackButton from "@/components/elements/BackButton/BackButton";
import Button from "@/components/elements/Button/Button";
import { updateIdeaSession } from "@/lib/idea-sessions";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CheckThemePresentation() {
  // パスからUUIDを取得
  const uuid = usePathname().split("/")[1];
  if (typeof uuid !== "string") {
    throw new Error("UUIDが取得できませんでした。");
  }

  const router = useRouter();

  // 遷移先パスをprefetch
  useEffect(() => {
    router.prefetch(`/${uuid}/theme`);
    router.prefetch(`/${uuid}/select-theme-category`);
  }, [uuid, router]);

  const handleYesClick = async () => {
    await updateIdeaSession(uuid, { isThemeDetermined: true });
    router.push(`/${uuid}/theme`);
  };

  const handleNoClick = async () => {
    await updateIdeaSession(uuid, { isThemeDetermined: false });
    router.push(`/${uuid}/select-theme-category`);
  };

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
