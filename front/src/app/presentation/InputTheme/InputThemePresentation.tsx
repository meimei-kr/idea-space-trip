"use client";

import styles from "@/app/presentation/InputTheme/InputThemePresentation.module.scss";
import BackButton from "@/components/elements/BackButton/BackButton";
import Textbox from "@/components/elements/Textbox/Textbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { LitUpBorders } from "@/components/ui/tailwind-buttons";
import { useUUIDCheck } from "@/hooks/useUUIDCheck";
import { ThemeState, submitTheme } from "@/lib/actions";
import { IdeaSessionType } from "@/types";
import Error from "next/error";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import {
  FaRegFaceFrown,
  FaRegFaceGrin,
  FaRegFaceGrinBeam,
} from "react-icons/fa6";
import { IoCheckboxOutline } from "react-icons/io5";

export default function InputThemePresentation({
  ideaSession,
}: {
  ideaSession: IdeaSessionType | null;
}) {
  const [isMoveAlertModalOpen, setIsMoveAlertModalOpen] = useState(false); // AIアイデア生成済みエラー画面の表示

  const router = useRouter();
  const { uuid, statusCode } = useUUIDCheck({ ideaSession });

  // フォーム送信時の処理
  const initialState: ThemeState = {
    errors: {},
  };
  const [state, dispatch] = useFormState(submitTheme, initialState);

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
  };

  // 戻るボタンの処理
  const handleBack = () => {
    router.push(`/${uuid}/check-theme`);
  };

  // エラーがある場合はエラーページを表示
  if (statusCode >= 400) {
    return <Error statusCode={statusCode} />;
  }

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.instruction}>アイデア出しのテーマを入力してね</p>
          <form action={dispatch} className={styles.form}>
            {state?.errors?.theme &&
              state?.errors?.theme.map((error, index) => (
                <div key={index} id="theme-error" className={styles.error}>
                  {error}
                </div>
              ))}
            <Textbox
              id="theme"
              name="theme"
              ariaDescribedby="theme-error"
              placeholder="255文字以内で入力してね"
            />
            <p className={styles.checkItem}>
              <IoCheckboxOutline />
              テーマが具体的かどうかチェック
            </p>
            <div className={styles.checkContainer} data-testid="check">
              <div className={styles.checkExamples}>
                <div>
                  <div className={styles.checkDecoration}>
                    NG
                    <FaRegFaceFrown />
                  </div>
                </div>
                <div className={styles.checkExample}>アプリ案</div>
                <div>
                  <div className={styles.checkDecoration}>
                    OK
                    <FaRegFaceGrin />
                  </div>
                </div>
                <div className={styles.checkExample}>
                  プログラミング学習アプリ
                </div>
                <div>
                  <div className={styles.checkDecoration}>
                    BEST
                    <FaRegFaceGrinBeam />
                  </div>
                </div>
                <div className={styles.checkExample}>
                  子どもが楽しく学べるプログラミング学習アプリ
                </div>
              </div>
            </div>
            <input type="hidden" value={uuid} id="uuid" name="uuid" />
            <SubmitButton />
          </form>

          {/* すでにAIによるアイデア回答を生成済みの場合、アイデア出し画面に遷移するダイアログ表示 */}
          <AlertDialog
            open={isMoveAlertModalOpen}
            aria-labelledby="responsive-dialog-title"
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogDescription>
                  このセッションで、すでにAIによるアイデア回答例を生成済みだよ。
                  <br />
                  アイデア出し画面に遷移するね。
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-col sm:flex-row gap-4 sm:gap-0">
                <AlertDialogAction onClick={handleMoveOkClick}>
                  OK
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <BackButton onClick={handleBack} />
    </main>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <LitUpBorders type="submit" disabled={pending}>
      決定
    </LitUpBorders>
  );
};
