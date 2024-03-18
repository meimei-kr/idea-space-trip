"use client";

import styles from "@/app/presentation/IdeaMemos/IdeaMemosPresentation.module.scss";
import BackButton from "@/components/elements/BackButton/BackButton";
import IdeaMemoCard from "@/components/elements/IdeaMemoCard/IdeaMemoCard";
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
  }, []);

  // 戻るボタンの処理
  const handleBack = () => {
    router.push("/select-mode");
  };

  return (
    <main className={styles.wrapper}>
      {ideaMemos.length === 0 ? (
        <div className={styles.noDataContainer}>
          <div className={styles.message}>
            <div>まだアイデアメモがないよ。</div>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.content}>
            {ideaMemos.map((memo) => (
              <IdeaMemoCard key={memo.uuid} ideaMemo={memo} />
            ))}
          </div>
        </div>
      )}

      <BackButton onClick={handleBack} />
    </main>
  );
}
