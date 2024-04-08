"use client";

import GenerateThemePresentation from "@/app/[uuid]/generate-theme/GenerateThemePresentation";
import { useUUIDCheck } from "@/hooks/useUUIDCheck";
import type { Option } from "@/types";
import { IdeaSessionType } from "@/types";
import Error from "next/error";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function GenerateThemeContainer({
  ideaSession,
  aiGeneratedThemesArray,
}: {
  ideaSession: IdeaSessionType | null;
  aiGeneratedThemesArray: Option[];
}) {
  const [isThemeGenerated, setIsThemeGenerated] = useState(
    ideaSession?.isAiThemeGenerated || false,
  );
  const [retryCount, setRetryCount] = useState(0);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false); // 無効な入力エラー画面の表示
  const [isMoveAlertModalOpen, setIsMoveAlertModalOpen] = useState(false); // AIアイデア生成済みエラー画面の表示
  const [hasApiError, setHasApiError] = useState(false); // APIリクエスト失敗時のエラーがあるかどうか

  const router = useRouter();
  const { uuid, statusCode } = useUUIDCheck({ ideaSession });

  // 遷移先パスをプレフェッチ
  useEffect(() => {
    router.prefetch(`/${uuid}/select-theme-category`);
    router.prefetch(`/${uuid}/generate-ideas`);
  }, [uuid, router]);

  // AIによるアイデア生成済みであれば、テーマ生成はせず、アイデア出し画面に遷移
  useEffect(() => {
    if (ideaSession?.isAiAnswerGenerated) {
      setIsMoveAlertModalOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // テーマ生成ボタンの状態更新
  useEffect(() => {
    if (aiGeneratedThemesArray.length > 0) {
      setIsThemeGenerated(true);
    }
  }, [aiGeneratedThemesArray]);

  // AIアイデア生成済みエラー画面でOKクリック時の処理
  const handleMoveOkClick = () => {
    setIsMoveAlertModalOpen(false);
    router.push(`/${uuid}/generate-ideas`);
    router.refresh();
  };

  // APIリクエストエラー時のアラートで再試行をクリック時の処理
  const handleRetryClick = () => {
    setHasApiError(false);
  };

  // エラーがある場合はエラーページを表示
  if (statusCode >= 400) {
    return <Error statusCode={statusCode} />;
  }

  return (
    <GenerateThemePresentation
      aiGeneratedThemesArray={aiGeneratedThemesArray}
      isThemeGenerated={isThemeGenerated}
      retryCount={retryCount}
      setRetryCount={setRetryCount}
      isAlertModalOpen={isAlertModalOpen}
      uuid={uuid}
      setHasApiError={setHasApiError}
      setIsAlertModalOpen={setIsAlertModalOpen}
      isMoveAlertModalOpen={isMoveAlertModalOpen}
      handleMoveOkClick={handleMoveOkClick}
      hasApiError={hasApiError}
      handleRetryClick={handleRetryClick}
      ideaSession={ideaSession}
    />
  );
}
