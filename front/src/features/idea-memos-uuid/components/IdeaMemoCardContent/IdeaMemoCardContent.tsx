"use client";

import AlertDialogOnDelete from "@/components/elements/AlertModalOnDelete/AlertDialogOnDelete";
import IdeaMemoCardFooter from "@/components/elements/IdeaMemoCardFooter/IdeaMemoCardFooter";
import {
  ButtonSection,
  CancelButton,
  CardBodyOnViewMode,
  DeleteButton,
  EditButton,
  EditForm,
} from "@/features/idea-memos-uuid/components";
import { deleteIdeaMemo } from "@/lib/idea-memos";
import { IdeaMemoType } from "@/types";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function IdeaMemoCardContent({
  ideaMemo,
}: {
  ideaMemo: IdeaMemoType;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  // 削除ボタン押下時
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsConfirmDialogOpen(true);
  };

  // 削除確認ダイアログのキャンセルボタン押下時
  const handleCancel = () => {
    setIsConfirmDialogOpen(false);
  };

  // 削除確認ダイアログのOKボタン押下時
  const handleDeleteOK = async () => {
    setIsConfirmDialogOpen(false);
    setIsDeleting(true);
    try {
      // 削除処理
      await deleteIdeaMemo(ideaMemo.uuid!);
      router.push("/idea-memos");
      router.refresh();
      toast.success("アイデアメモを削除しました");
    } catch (error) {
      toast.error("アイデアメモの削除に失敗しました");
    } finally {
      setIsDeleting(false);
    }
  };

  // 編集ボタン押下時
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // 編集モードでキャンセルボタン押下時
  const handleBackClick = () => {
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <>
          {/* 編集モードの場合 */}
          <EditForm setIsEditing={setIsEditing} ideaMemo={ideaMemo}>
            <IdeaMemoCardFooter ideaMemo={ideaMemo} />
          </EditForm>
          <CancelButton onClick={handleBackClick} />
        </>
      ) : (
        <>
          {/* 詳細表示モードの場合 */}
          <CardBodyOnViewMode ideaMemo={ideaMemo} />
          <IdeaMemoCardFooter ideaMemo={ideaMemo} />
          <ButtonSection>
            <EditButton handleEditClick={handleEditClick} />
            <DeleteButton onSubmit={onSubmit} ideaMemo={ideaMemo} />
          </ButtonSection>
        </>
      )}
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
