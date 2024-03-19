"use client";

import BackButton from "@/components/elements/BackButton/BackButton";
import { IdeaMemoType } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { IdeaMemoList } from "../IdeaMemoList/IdeaMemoList";
import styles from "./ModalHome.module.scss";

export default function ModalHome({
  ideaMemo,
  ideaMemos,
  open,
}: {
  ideaMemo: IdeaMemoType;
  ideaMemos: IdeaMemoType[];
  open: boolean;
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
      <IdeaMemoList
        open={open}
        uuid={ideaMemo.uuid ?? ""}
        ideaMemos={ideaMemos}
      />
      <BackButton onClick={handleBack} />
    </main>
  );
}
