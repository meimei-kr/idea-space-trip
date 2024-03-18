"use client";

import styles from "@/app/presentation/EndSession/EndSessionPresentation.module.scss";
import Description from "@/components/elements/Description/Description";
import { LitUpBordersLg } from "@/components/ui/tailwind-buttons";
import { useUUIDCheck } from "@/hooks/useUUIDCheck";
import { IdeaMemoType, IdeaSessionType } from "@/types";
import Error from "next/error";
import { useRouter } from "next/navigation";
import Astronaut from "public/images/astronaut.svg";
import Blob from "public/images/white-blob-2.svg";
import { useEffect } from "react";

export default function EndSessionPresentation({
  ideaSession,
  ideaMemos,
  ideaMemosCountThisMonth,
  ideaCountDifference,
}: {
  ideaSession: IdeaSessionType | null;
  ideaMemos: IdeaMemoType[] | null;
  ideaMemosCountThisMonth: number;
  ideaCountDifference: number;
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
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Description>アイデア出しセッション終了</Description>
          <div className={styles.astronautContainer}>
            <div className={styles.fukidashi}>\ お疲れさまでした /</div>
            <Astronaut className={styles.astronaut} />
          </div>
          {/* 前回のセッションと比べて、出したアイデアの数が増えた場合のメッセージ */}
          {ideaCountDifference > 0 && (
            <div className={styles.endCommentContainer}>
              <Blob className={styles.blob} />
              <div className={styles.endComment}>
                前回のセッションと比べて、
                <br />
                <span>{ideaCountDifference}</span>{" "}
                個ひらめいたアイデアがふえたよ！
              </div>
            </div>
          )}
          <div className={styles.resultWrapper}>
            <div className={styles.resultContainer}>
              <div className={styles.resultTitle}>
                今回のセッションで出たアイデアの数
              </div>
              <div className={styles.resultCount}>
                <span>{ideaMemos?.length || 0}</span> 個
              </div>
            </div>
            <div className={styles.resultContainer}>
              <div className={styles.resultTitle}>今月出したアイデアの総数</div>
              <div className={styles.resultCount}>
                <span>{ideaMemosCountThisMonth}</span> 個
              </div>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <LitUpBordersLg type="button" onClick={handleClick}>
              モード選択画面へ
            </LitUpBordersLg>
          </div>
        </div>
      </div>
    </main>
  );
}
