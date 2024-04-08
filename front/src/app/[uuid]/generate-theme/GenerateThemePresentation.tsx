"use client";

import styles from "@/app/[uuid]/generate-theme/GenerateTheme.module.scss";
import AlertModal from "@/components/elements/AlertModal/AlertModal";
import BackButton from "@/components/elements/BackButton/BackButton";
import Description from "@/components/elements/Description/Description";
import * as GenerateTheme from "@/features/generate-theme/components";
import type { IdeaSessionType, Option } from "@/types";

export default function GenerateThemePresentation({
  aiGeneratedThemesArray,
  isThemeGenerated,
  retryCount,
  setRetryCount,
  isAlertModalOpen,
  uuid,
  setIsAlertModalOpen,
  setHasApiError,
  isMoveAlertModalOpen,
  handleMoveOkClick,
  hasApiError,
  handleRetryClick,
  ideaSession,
}: {
  aiGeneratedThemesArray: Option[];
  isThemeGenerated: boolean;
  retryCount: number;
  setRetryCount: React.Dispatch<React.SetStateAction<number>>;
  isAlertModalOpen: boolean;
  uuid: string;
  setIsAlertModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setHasApiError: React.Dispatch<React.SetStateAction<boolean>>;
  isMoveAlertModalOpen: boolean;
  handleMoveOkClick: () => void;
  hasApiError: boolean;
  handleRetryClick: () => void;
  ideaSession: IdeaSessionType | null;
}) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <Description>
            <p>先程選んだカテゴリーと</p>
            <p>以下の質問への回答をもとに、</p>
            <p>AIがテーマを提案するよ</p>
          </Description>
          <GenerateTheme.CategorySection ideaSession={ideaSession} />

          {/* 回答送信フォーム */}
          <GenerateTheme.AnswerForm
            isThemeGenerated={isThemeGenerated}
            retryCount={retryCount}
            setRetryCount={setRetryCount}
            isAlertModalOpen={isAlertModalOpen}
            setIsAlertModalOpen={setIsAlertModalOpen}
            uuid={uuid}
            setHasApiError={setHasApiError}
          />

          {/* AIが生成したテーマ表示 */}
          {aiGeneratedThemesArray.length > 0 && (
            <GenerateTheme.ThemesDisplay>
              <GenerateTheme.SelectForm
                aiGeneratedThemesArray={aiGeneratedThemesArray}
                uuid={uuid}
              />
            </GenerateTheme.ThemesDisplay>
          )}

          {/* すでにAIによるアイデア回答を生成済みの場合、アイデア出し画面に遷移するダイアログ表示 */}
          <AlertModal
            isOpen={isMoveAlertModalOpen}
            onClick={handleMoveOkClick}
            actionDisplay="OK"
          >
            このセッションで、すでにAIによるアイデア回答例を生成済みだよ。
            <br />
            アイデア出し画面に遷移するね。
          </AlertModal>

          {/* APIリクエストエラー時のアラート */}
          <AlertModal
            isOpen={hasApiError}
            onClick={handleRetryClick}
            actionDisplay="再試行"
          >
            ごめんね、AIの回答生成失敗です。再試行してみてね。
          </AlertModal>
        </div>
      </div>

      <BackButton path={`/${uuid}/select-theme-category`} />
    </>
  );
}
