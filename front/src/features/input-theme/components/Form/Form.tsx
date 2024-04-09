"use client";

import AlertModal from "@/components/elements/AlertModal/AlertModal";
import ErrorAlert from "@/components/elements/ErrorAlert/ErrorAlert";
import Textbox from "@/components/elements/Textbox/Textbox";
import { LitUpBordersLg } from "@/components/ui/tailwind-buttons";
import styles from "@/features/input-theme/components/Form/Form.module.scss";
import { useUUIDCheck } from "@/hooks/useUUIDCheck";
import { ThemeState, submitTheme } from "@/lib/actions";
import { IdeaSessionType } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import {
  FaRegFaceFrown,
  FaRegFaceGrin,
  FaRegFaceGrinBeam,
} from "react-icons/fa6";
import { IoCheckboxOutline } from "react-icons/io5";

export default function Form({
  ideaSession,
}: {
  ideaSession: IdeaSessionType | null;
}) {
  const [isMoveAlertModalOpen, setIsMoveAlertModalOpen] = useState(false); // AIアイデア生成済みエラー画面の表示
  const { uuid } = useUUIDCheck({ ideaSession });
  const router = useRouter();

  // AIによるアイデア生成済みであれば、テーマ生成はせず、アイデア出し画面に遷移
  useEffect(() => {
    if (ideaSession?.isAiAnswerGenerated) {
      setIsMoveAlertModalOpen(true);
    }
  }, [ideaSession?.isAiAnswerGenerated]);

  // 遷移先パスをプレフェッチ
  useEffect(() => {
    router.prefetch(`/${uuid}/generate-ideas`);
  }, [uuid, router]);

  // AIアイデア生成済みエラー画面でOKクリック時の処理
  const handleMoveOkClick = () => {
    setIsMoveAlertModalOpen(false);
    router.push(`/${uuid}/generate-ideas`);
    router.refresh();
  };

  // フォーム送信時の処理
  const initialState: ThemeState = {
    errors: {},
  };
  const [state, dispatch] = useFormState(submitTheme, initialState);

  // フォーム入力エラーがあれば、トースト表示
  useEffect(() => {
    if (state?.errors?.theme) {
      toast.error("エラーがあるよ。確認してね。");
    }
  }, [state?.errors?.theme]);

  return (
    <>
      <form action={dispatch} className={styles.form}>
        {state?.errors?.theme &&
          state?.errors?.theme.map((error, index) => (
            <ErrorAlert id="theme-error" key={index} error={error} />
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
            <div className={styles.checkExample}>プログラミング学習アプリ</div>
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
      <AlertModal
        isOpen={isMoveAlertModalOpen}
        onClick={handleMoveOkClick}
        actionDisplay="OK"
      >
        このセッションで、すでにAIによるアイデア回答例を生成済みだよ。
        <br />
        アイデア出し画面に遷移するね。
      </AlertModal>
    </>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <LitUpBordersLg type="submit" disabled={pending}>
      決定
    </LitUpBordersLg>
  );
};
