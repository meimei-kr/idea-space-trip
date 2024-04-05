"use client";

import { useUUIDCheck } from "@/hooks/useUUIDCheck";
import { IdeaSessionType } from "@/types";
import Error from "next/error";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import InputThemePresentation from "./InputThemePresentation";

export default function InputThemeContainer({
  ideaSession,
}: {
  ideaSession: IdeaSessionType | null;
}) {
  const [isMoveAlertModalOpen, setIsMoveAlertModalOpen] = useState(false); // AIアイデア生成済みエラー画面の表示

  const router = useRouter();
  const { uuid, statusCode } = useUUIDCheck({ ideaSession });

  // 遷移先パスをプレフェッチ
  useEffect(() => {
    router.prefetch(`/${uuid}/check-theme`);
    router.prefetch(`/${uuid}/generate-ideas`);
  }, [uuid, router]);

  // AIによるアイデア生成済みであれば、テーマ生成はせず、アイデア出し画面に遷移
  useEffect(() => {
    if (ideaSession?.isAiAnswerGenerated) {
      setIsMoveAlertModalOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // AIアイデア生成済みエラー画面でOKクリック時の処理
  const handleMoveOkClick = () => {
    setIsMoveAlertModalOpen(false);
    router.push(`/${uuid}/generate-ideas`);
    router.refresh();
  };

  // エラーがある場合はエラーページを表示
  if (statusCode >= 400) {
    return <Error statusCode={statusCode} />;
  }

  return (
    <InputThemePresentation
      uuid={uuid}
      isMoveAlertModalOpen={isMoveAlertModalOpen}
      handleMoveOkClick={handleMoveOkClick}
    />
  );
}
