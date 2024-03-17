"use client";

import styles from "@/app/presentation/GenerateTheme/GenerateThemePresentation.module.scss";
import AiGenerationLoading from "@/components/elements/AiGenerationLoading/AiGenerationLoading";
import BackButton from "@/components/elements/BackButton/BackButton";
import RadioButtons from "@/components/elements/RadioButtons/RadioButtons";
import SectionTitle from "@/components/elements/SectionTitle/SectionTitle";
import Textbox from "@/components/elements/Textbox/Textbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LitUpBorders } from "@/components/ui/tailwind-buttons";
import { useUUIDCheck } from "@/hooks/useUUIDCheck";
import {
  GeneratedThemesState,
  ThemeQuestionState,
  confirmTheme,
  generateThemes,
} from "@/lib/actions";
import { updateAIUsageHistory } from "@/lib/ai-usage-history";
import { createIdeaSession, deleteIdeaSession } from "@/lib/idea-sessions";
import { generateUUID } from "@/lib/uuid";
import type { Option } from "@/types";
import { IdeaSessionType } from "@/types";
import { ThemeCategoryEnum, ThemeQuestionEnum } from "@/utils/enums";
import Error from "next/error";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { BsExclamationTriangle } from "react-icons/bs";

export default function GenerateThemePresentation({
  ideaSession,
  aiGeneratedThemesArray,
}: {
  ideaSession: IdeaSessionType | null;
  aiGeneratedThemesArray: Option[];
}) {
  const [isThemeGenerated, setIsThemeGenerated] = useState(
    ideaSession?.isAiThemeGenerated,
  );
  const [retryCount, setRetryCount] = useState(0);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false); // 無効な入力エラー画面の表示
  const [isMoveAlertModalOpen, setIsMoveAlertModalOpen] = useState(false); // AIアイデア生成済みエラー画面の表示
  const router = useRouter();
  const { uuid, statusCode } = useUUIDCheck({ ideaSession });

  // フォームの状態
  const initialQuestionState: ThemeQuestionState = {
    errors: {},
  };
  const [questionState, dispatchQuestion] = useFormState(
    generateThemes,
    initialQuestionState,
  );
  const initialGeneratedThemesState: GeneratedThemesState = {
    errors: {},
  };
  const [generatedThemesState, dispatchGeneratedThemes] = useFormState(
    confirmTheme,
    initialGeneratedThemesState,
  );

  // 遷移先パスをプレフェッチ
  useEffect(() => {
    router.prefetch(`/${uuid}/select-theme-category`);
    router.prefetch(`/${uuid}/generate-ideas`);
  }, [uuid]);

  // AIによるアイデア生成済みであれば、テーマ生成はせず、アイデア出し画面に遷移
  useEffect(() => {
    if (ideaSession?.isAiAnswerGenerated) {
      setIsMoveAlertModalOpen(true);
    }
  }, []);

  // テーマ生成ボタンの状態更新
  useEffect(() => {
    if (aiGeneratedThemesArray.length > 0) {
      setIsThemeGenerated(true);
    }
  }, [aiGeneratedThemesArray]);

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
  // 当該アイデア出しセッションを終了
  // テーマ有無選択画面に遷移し、新しいアイデア出しセッションを開始
  const handleOkClick = async () => {
    setIsAlertModalOpen(false);
    // ai_usage_historiesテーブルの使用回数を1増やす
    await updateAIUsageHistory();
    // idea_sessionsテーブルから当該セッションを削除
    await deleteIdeaSession(uuid);
    // 新しいアイデア出しセッションを開始
    const newUUID = generateUUID();
    await createIdeaSession(newUUID);
    router.push(`/${encodeURIComponent(newUUID)}/check-theme`);
  };

  // AIアイデア生成済みエラー画面でOKクリック時の処理
  const handleMoveOkClick = () => {
    setIsMoveAlertModalOpen(false);
    router.push(`/${uuid}/generate-ideas`);
  };

  // 戻るボタンの処理
  const handleBack = () => {
    router.push(`/${uuid}/select-theme-category`);
  };

  // エラーがある場合はエラーページを表示
  if (statusCode >= 400) {
    return <Error statusCode={statusCode} />;
  }

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.description}>
            <p>先程選んだカテゴリーと</p>
            <p>以下の質問への回答をもとに、</p>
            <p>AIがテーマを提案するよ</p>
          </div>
          <div className={styles.themeCategory}>
            <div className={styles.categoryTitle}>
              <SectionTitle>カテゴリー</SectionTitle>
            </div>
            <div className={styles.categoryContainer}>
              <p>
                {
                  ThemeCategoryEnum[
                    ideaSession?.themeCategory as keyof typeof ThemeCategoryEnum
                  ]
                }
              </p>
            </div>
          </div>

          {/* 回答送信フォーム */}
          <form action={dispatchQuestion} className={styles.answerForm}>
            <div className={styles.question}>
              <div className={styles.questionTitle}>
                <SectionTitle>質問</SectionTitle>
              </div>
              <div className={styles.inputContainer}>
                {questionState?.errors?.option &&
                  questionState?.errors?.option.map((error, index) => (
                    <div
                      key={index}
                      id="theme-question-error"
                      className={styles.error}
                    >
                      {error}
                    </div>
                  ))}
                <Select name="option" aria-describedby="theme-question-error">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="回答する質問を選んでね" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="question1">
                        {ThemeQuestionEnum.question1}
                      </SelectItem>
                      <SelectItem value="question2">
                        {ThemeQuestionEnum.question2}
                      </SelectItem>
                      <SelectItem value="question3">
                        {ThemeQuestionEnum.question3}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {questionState?.errors?.answer &&
                  questionState?.errors?.answer.map((error, index) => (
                    <div
                      key={index}
                      id="theme-answer-error"
                      className={styles.error}
                    >
                      {error}
                    </div>
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
            <AlertDialog
              open={isAlertModalOpen}
              aria-labelledby="responsive-dialog-title"
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogDescription>
                    無効な入力が複数回続けて検知されたよ。
                    <br />
                    新しいセッションを作成するので、もう一度やってみてね。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-col sm:flex-row gap-4 sm:gap-0">
                  <AlertDialogAction onClick={handleOkClick}>
                    OK
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </form>

          {/* AIが生成したテーマ表示 */}
          {aiGeneratedThemesArray.length > 0 && (
            <div className={styles.themesGenerated}>
              <p className={styles.themesSuggestion}>
                こんなテーマはどうかな？
              </p>
              <form
                action={dispatchGeneratedThemes}
                className={styles.selectThemeForm}
              >
                {generatedThemesState?.errors?.option &&
                  generatedThemesState?.errors?.option.map((error, index) => (
                    <div
                      key={index}
                      id="theme-category-error"
                      className={styles.error}
                    >
                      {error}
                    </div>
                  ))}
                <RadioButtons
                  options={aiGeneratedThemesArray}
                  ariaDescribedby="generated_themes_error"
                />
                <input type="hidden" name="uuid" value={uuid} />
                <LitUpBorders type="submit">決定</LitUpBorders>
              </form>
            </div>
          )}

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

const SubmitButton = ({
  isThemeGenerated,
  handleRetryCount,
}: {
  isThemeGenerated: boolean | undefined;
  handleRetryCount: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  const { pending } = useFormStatus();

  return (
    <LitUpBorders
      type="submit"
      disabled={isThemeGenerated || pending}
      onClick={handleRetryCount}
    >
      テーマ生成
    </LitUpBorders>
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
