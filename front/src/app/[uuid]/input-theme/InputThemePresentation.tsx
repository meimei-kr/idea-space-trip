"use client";

import styles from "@/app/[uuid]/input-theme/InputTheme.module.scss";
import AlertModal from "@/components/elements/AlertModal/AlertModal";
import BackButton from "@/components/elements/BackButton/BackButton";
import Description from "@/components/elements/Description/Description";
import * as InputTheme from "@/features/input-theme/components";

export default function InputThemePresentation({
  uuid,
  isMoveAlertModalOpen,
  handleMoveOkClick,
}: {
  uuid: string;
  isMoveAlertModalOpen: boolean;
  handleMoveOkClick: () => void;
}) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <Description>アイデア出しのテーマを入力してね</Description>
          <InputTheme.Form uuid={uuid} />
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
        </div>
      </div>
      <BackButton path={`/${uuid}/check-theme`} />
    </>
  );
}
