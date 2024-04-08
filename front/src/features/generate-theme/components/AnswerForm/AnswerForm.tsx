"use client";

import AiGenerationLoading from "@/components/elements/AiGenerationLoading/AiGenerationLoading";
import AlertModal from "@/components/elements/AlertModal/AlertModal";
import ErrorAlert from "@/components/elements/ErrorAlert/ErrorAlert";
import SectionTitle from "@/components/elements/SectionTitle/SectionTitle";
import Textbox from "@/components/elements/Textbox/Textbox";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { LitUpBordersLg } from "@/components/ui/tailwind-buttons";
import styles from "@/features/generate-theme/components/AnswerForm/AnswerForm.module.scss";
import SelectOptions from "@/features/generate-theme/components/SelectOptions/SelectOptions";
import { ThemeQuestionState, generateThemes } from "@/lib/actions";
import { updateAIUsageHistory } from "@/lib/ai-usage-history";
import { createIdeaSession, deleteIdeaSession } from "@/lib/idea-sessions";
import { generateUUID } from "@/lib/uuid";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import { BsExclamationTriangle } from "react-icons/bs";

export default function AnswerForm({
  isThemeGenerated,
  retryCount,
  setRetryCount,
  isAlertModalOpen,
  setIsAlertModalOpen,
  uuid,
  setHasApiError,
}: {
  isThemeGenerated: boolean | undefined;
  retryCount: number;
  setRetryCount: React.Dispatch<React.SetStateAction<number>>;
  isAlertModalOpen: boolean;
  setIsAlertModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  uuid: string;
  setHasApiError: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();

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
    if (result?.invalid) {
      if (questionState?.errors?.option || questionState?.errors?.answer) {
        toast.error("エラーがあるよ。確認してね。");
      }
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
            placeholder="255文字以内で回答を入力してね。複数回答してもOKだよ。"
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
