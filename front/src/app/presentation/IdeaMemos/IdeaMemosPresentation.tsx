"use client";

import styles from "@/app/presentation/IdeaMemos/IdeaMemosPresentation.module.scss";
import BackButton from "@/components/elements/BackButton/BackButton";
import { IdeaMemoList } from "@/components/elements/IdeaMemoList/IdeaMemoList";
import { IdeaMemoType } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function IdeaMemosPresentation({
  ideaMemos,
}: {
  ideaMemos: IdeaMemoType[];
}) {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("select-mode");
  }, [router]);

  // 戻るボタンの処理
  const handleBack = () => {
    router.push("/select-mode");
  };

  return (
    <main className={styles.wrapper}>
      <IdeaMemoList ideaMemos={ideaMemos} />
      <BackButton onClick={handleBack} />
    </main>
  );
}
