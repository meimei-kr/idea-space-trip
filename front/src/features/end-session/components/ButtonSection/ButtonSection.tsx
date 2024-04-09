"use client";

import { LitUpBordersLg } from "@/components/ui/tailwind-buttons";
import styles from "@/features/end-session/components/ButtonSection/ButtonSection.module.scss";
import { useUUIDCheck } from "@/hooks/useUUIDCheck";
import type { IdeaSessionType } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ButtonSection({
  ideaSession,
}: {
  ideaSession: IdeaSessionType | null;
}) {
  useUUIDCheck({ ideaSession });
  const router = useRouter();

  // モード選択画面へのパスをプリフェッチ
  useEffect(() => {
    router.prefetch("/select-mode");
  }, [router]);

  const handleClick = () => {
    router.push("/select-mode");
  };

  return (
    <div className={styles.buttonContainer}>
      <LitUpBordersLg type="button" onClick={handleClick}>
        モード選択画面へ
      </LitUpBordersLg>
    </div>
  );
}
