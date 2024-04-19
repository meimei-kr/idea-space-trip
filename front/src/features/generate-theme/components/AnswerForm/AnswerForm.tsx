"use client";

import AiGenerationLoading from "@/components/elements/AiGenerationLoading/AiGenerationLoading";
import AlertModal from "@/components/elements/AlertModal/AlertModal";
import ErrorAlert from "@/components/elements/ErrorAlert/ErrorAlert";
import SectionTitle from "@/components/elements/SectionTitle/SectionTitle";
import Textbox from "@/components/elements/Textbox/Textbox";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { LitUpBordersLg } from "@/components/ui/tailwind-buttons";
import { FORM_CHARACTER_LIMIT } from "@/constants/constants";
import styles from "@/features/generate-theme/components/AnswerForm/AnswerForm.module.scss";
import SelectOptions from "@/features/generate-theme/components/SelectOptions/SelectOptions";
import { useUUIDCheck } from "@/hooks/useUUIDCheck";
import { ThemeQuestionState, generateThemes } from "@/lib/actions";
import { updateAIUsageHistory } from "@/lib/ai-usage-history";
import { createIdeaSession, deleteIdeaSession } from "@/lib/idea-sessions";
import { generateUUID } from "@/lib/uuid";
import type { IdeaSessionType, Option } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import { BsExclamationTriangle } from "react-icons/bs";

export default function AnswerForm({
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
  const [hasApiError, setHasApiError] = useState(false); // APIリクエスト失敗時のエラーがあるかどうか
  const [isMoveAlertModalOpen, setIsMoveAlertModalOpen] = useState(false); // AIアイデア生成済みエラー画面の表示

  const { uuid } = useUUIDCheck({ ideaSession });
  const router = useRouter();

  // テーマ生成ボタンの状態更新
  useEffect(() => {
    if (aiGeneratedThemesArray.length > 0) {
      setIsThemeGenerated(true);
    }
  }, [aiGeneratedThemesArray]);

  // 質問、回答送信フォームの状態
  const initialQuestionState: ThemeQuestionState = {
    errors: {},
    invalid: false,
    apiError: false,
  };
  const [questionState, dispatchQuestion] = useFormState<
    ThemeQuestionState | undefined,
    FormData
  >(async (prev: ThemeQuestionState | undefined, formData: FormData) => {
    const result = await generateThemes(prev, formData);
    if (result?.errors?.option || result?.errors?.answer) {
      toast.error("エラーがあるよ。確認してね。");
    }
    if (result?.invalid) {
      setIsAlertModalOpen(true);
    }
    if (result?.apiError) {
      setHasApiError(true);
    }
    return result;
  }, initialQuestionState);

  // 無効な入力によるリトライ回数を2回許可する
  const handleRetryCount = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (retryCount <= 2) {
      setRetryCount((prev) => prev + 1);
    } else {
      e.preventDefault();
      // リトライ回数が2回を超えた場合、エラーメッセージを表示
      setIsAlertModalOpen(true);
    }
  };

  // 無効な入力エラー画面でOKクリック時の処理
  const handleOkClick = async () => {
    setIsAlertModalOpen(false);
    if (retryCount > 2) {
      // リトライ回数制限に達した場合
      // ai_usage_historiesテーブルの使用回数を1増やす
      await updateAIUsageHistory();
      // idea_sessionsテーブルから当該セッションを削除
      await deleteIdeaSession(uuid);
      // 新しいアイデア出しセッションを開始
      const newUUID = generateUUID();
      await createIdeaSession(newUUID);
      router.push(`/${encodeURIComponent(newUUID)}/check-theme`);
    }
  };

  // APIリクエストエラー時のアラートで再試行をクリック時の処理
  const handleRetryClick = () => {
    setHasApiError(false);
  };

  // AIによるアイデア生成済みであれば、テーマ生成はせず、アイデア出し画面に遷移
  useEffect(() => {
    if (ideaSession?.isAiAnswerGenerated) {
      setIsMoveAlertModalOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <form action={dispatchQuestion} className={styles.answerForm}>
      <div className={styles.question}>
        <div className={styles.questionTitle}>
          <SectionTitle>質問</SectionTitle>
        </div>
        <div className={styles.inputContainer}>
          {questionState?.errors?.option &&
            questionState?.errors?.option.map((error, index) => (
              <ErrorAlert id="theme-question-error" key={index} error={error} />
            ))}
          <SelectOptions />
          {questionState?.errors?.answer &&
            questionState?.errors?.answer.map((error, index) => (
              <ErrorAlert id="theme-answer-error" key={index} error={error} />
            ))}
          <Textbox
            id="answer"
            name="answer"
            ariaDescribedby="theme-answer-error"
            placeholder={`${FORM_CHARACTER_LIMIT}文字以内で回答を入力してね。複数回答してもOKだよ。`}
          />
        </div>
      </div>
      <input type="hidden" name="uuid" value={uuid} />
      <div className={styles.caution}>
        <BsExclamationTriangle className={styles.cautionIcon} />
        <div>
          テーマ生成は、<span>１セッションにつき１回だけ</span>なので、
          入力内容がこれでいいか確認してからボタンを押してね。
        </div>
      </div>
      <SubmitButton
        isThemeGenerated={isThemeGenerated}
        handleRetryCount={handleRetryCount}
      />
      {/* AIテーマ生成中のローディング */}
      <AiLoading />

      {/* エラーダイアログ */}
      <AlertModal
        isOpen={isAlertModalOpen}
        onClick={handleOkClick}
        actionDisplay="OK"
      >
        {retryCount <= 2 ? (
          <>
            無効な入力だと判断されたよ。
            <br />
            入力内容を変えてもう一度試してみてね。
          </>
        ) : (
          <>
            複数回続けてエラーが検知されたよ。
            <br />
            新しいセッションを作成するので、もう一度やってみてね。
          </>
        )}
      </AlertModal>

      {/* APIリクエストエラー時のアラート */}
      <AlertModal
        isOpen={hasApiError}
        onClick={handleRetryClick}
        actionDisplay="再試行"
      >
        ごめんね、AIの回答生成失敗です。再試行してみてね。
      </AlertModal>

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
    </form>
  );
}

const SubmitButton = ({
  isThemeGenerated,
  handleRetryCount,
}: {
  isThemeGenerated: boolean | undefined;
  handleRetryCount: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  const { pending } = useFormStatus();

  return (
    <LitUpBordersLg
      type="submit"
      disabled={isThemeGenerated || pending}
      onClick={handleRetryCount}
    >
      テーマ生成
    </LitUpBordersLg>
  );
};

const AiLoading = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending && (
        <AlertDialog open={pending} aria-labelledby="responsive-dialog-title">
          <AlertDialogContent className={styles.loadingContainer}>
            <AiGenerationLoading />
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};
