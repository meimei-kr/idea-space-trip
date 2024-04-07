"use client";

import styles from "@/app/idea-memos/(show)/[uuid]/IdeaMemosUuid.module.scss";
import AlertDialogOnDelete from "@/components/elements/AlertModalOnDelete/AlertDialogOnDelete";
import * as IdeaMemosUuid from "@/features/idea-memos-uuid/components";

import { IdeaMemoType } from "@/types";

export default function IdeaMemosUuidPresentation({
  isEditing,
  setIsEditing,
  handleBackClick,
  handleEditClick,
  onSubmit,
  isConfirmDialogOpen,
  handleCancel,
  handleDeleteOK,
  isDeleting,
  ideaMemo,
}: {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  handleBackClick: () => void;
  handleEditClick: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isConfirmDialogOpen: boolean;
  handleCancel: () => void;
  handleDeleteOK: () => void;
  isDeleting: boolean;
  ideaMemo: IdeaMemoType;
}) {
  return (
    <>
      <div className={styles.cardContainer}>
        <IdeaMemosUuid.IdeaMemoCardHeader />

        {isEditing ? (
          <>
            {/* 編集モードの場合 */}
            <IdeaMemosUuid.EditForm
              setIsEditing={setIsEditing}
              ideaMemo={ideaMemo}
            >
              <IdeaMemosUuid.CardFooter ideaMemo={ideaMemo} />
            </IdeaMemosUuid.EditForm>
            <IdeaMemosUuid.CancelButton onClick={handleBackClick} />
          </>
        ) : (
          <>
            {/* 詳細表示モードの場合 */}
            <IdeaMemosUuid.CardBodyOnViewMode ideaMemo={ideaMemo} />
            <IdeaMemosUuid.CardFooter ideaMemo={ideaMemo} />
            <IdeaMemosUuid.ButtonSection>
              <IdeaMemosUuid.EditButton handleEditClick={handleEditClick} />
              <IdeaMemosUuid.DeleteButton
                onSubmit={onSubmit}
                ideaMemo={ideaMemo}
              />
            </IdeaMemosUuid.ButtonSection>
          </>
        )}
      </div>

      {/* 削除確認ダイアログ */}
      <AlertDialogOnDelete
        isOpen={isConfirmDialogOpen}
        onClickCancel={handleCancel}
        onClickOk={handleDeleteOK}
        disabled={isDeleting}
        dialogTitle="本当に削除する？"
        dialogDescription="「OK」を押すと、削除されて元に戻せないので、注意してね。"
      />
    </>
  );
}
