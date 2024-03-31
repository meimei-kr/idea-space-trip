"use client";

import styles from "@/app/presentation/MyPage/MyPagePresentation.module.scss";
import DangerButton from "@/components/elements/DangerButton/DangerButton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteUser } from "@/lib/user";
import { UserType } from "@/types";
import { signOut } from "next-auth/react";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function MyPagePresentation({ user }: { user: UserType }) {
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
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>ユーザー設定</h1>
          <form onSubmit={onSubmit} className={styles.form}>
            <div className={styles.accountContainer}>
              <h2>
                現在ログイン中の<span>アカウント</span>
              </h2>
              <div className={styles.email}>{user.email}</div>
            </div>
            <DangerButton>アカウントを削除</DangerButton>
          </form>
        </div>
      </div>
      {/* 削除確認ダイアログ */}
      <AlertDialog open={isConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-slate-950">
              本当にユーザーを削除する？
            </AlertDialogTitle>
            <AlertDialogDescription className="text-left">
              「OK」を押すと、以下のデータは削除されて元に戻せないので、注意してね。
              <br />
              ・ ユーザー情報
              <br />
              ・ アイデア出しセッション情報
              <br />・ アイデアメモ
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-gap">
            <AlertDialogCancel
              className="text-slate-950"
              onClick={handleCancel}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteOK}
              disabled={pending}
              className="text-red-500 bg-red-200 hover:bg-red-100"
            >
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
