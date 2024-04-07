"use client";

import IdeaMemosUuidPresentation from "@/app/idea-memos/(show)/[uuid]/IdeaMemosUuidPresentation";
import { deleteIdeaMemo } from "@/lib/idea-memos";
import { IdeaMemoType } from "@/types";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function IdeaMemosUuidContainer({
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
    <IdeaMemosUuidPresentation
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      handleBackClick={handleBackClick}
      handleEditClick={handleEditClick}
      onSubmit={onSubmit}
      isConfirmDialogOpen={isConfirmDialogOpen}
      handleCancel={handleCancel}
      handleDeleteOK={handleDeleteOK}
      isDeleting={isDeleting}
      ideaMemo={ideaMemo}
    />
  );
}
