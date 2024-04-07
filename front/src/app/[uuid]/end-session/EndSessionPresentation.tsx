"use client";

import styles from "@/app/[uuid]/end-session/EndSession.module.scss";
import { LitUpBordersLg } from "@/components/ui/tailwind-buttons";
import { useUUIDCheck } from "@/hooks/useUUIDCheck";
import { IdeaSessionType } from "@/types";
import Error from "next/error";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EndSessionPresentation({
  ideaSession,
}: {
  ideaSession: IdeaSessionType | null;
}) {
  const { statusCode } = useUUIDCheck({ ideaSession });
  const router = useRouter();

  // モード選択画面へのパスをプリフェッチ
  useEffect(() => {
    router.prefetch("/select-mode");
  }, [router]);

  const handleClick = () => {
    router.push("/select-mode");
  };

  // エラーがある場合はエラーページを表示
  if (statusCode >= 400) {
    return <Error statusCode={statusCode} />;
  }

  return (
    <div className={styles.buttonContainer}>
      <LitUpBordersLg type="button" onClick={handleClick}>
        モード選択画面へ
      </LitUpBordersLg>
    </div>
  );
}
