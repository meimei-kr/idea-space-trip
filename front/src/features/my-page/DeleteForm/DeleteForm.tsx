"use client";

import AlertDialogOnDelete from "@/components/elements/AlertModalOnDelete/AlertDialogOnDelete";
import DangerButton from "@/components/elements/DangerButton/DangerButton";
import styles from "@/features/my-page/DeleteForm/DeleteForm.module.scss";
import { deleteUser } from "@/lib/user";
import { UserType } from "@/types";
import { signOut } from "next-auth/react";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function DeleteForm({ user }: { user: UserType }) {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [pending, setPending] = useState(false);

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
    setPending(true);
    try {
      // 削除処理
      await deleteUser();
      await signOut({ callbackUrl: "/" });
      toast.success("アカウントを削除しました");
    } catch (error) {
      toast.error("アカウント削除に失敗しました");
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.accountContainer}>
          <h2>
            現在ログイン中の<span>アカウント</span>
          </h2>
          <div>{user.email}</div>
        </div>
        <DangerButton>アカウントを削除</DangerButton>
      </form>
      {/* 削除確認ダイアログ */}
      <AlertDialogOnDelete
        isOpen={isConfirmDialogOpen}
        onClickCancel={handleCancel}
        onClickOk={handleDeleteOK}
        disabled={pending}
        dialogTitle="本当にユーザーを削除する？"
        dialogDescription={
          <>
            「OK」を押すと、以下のデータは削除されて元に戻せないので、注意してね。
            <br />
            ・ ユーザー情報
            <br />
            ・ アイデア出しセッション情報
            <br />・ アイデアメモ
          </>
        }
      />
    </>
  );
}
