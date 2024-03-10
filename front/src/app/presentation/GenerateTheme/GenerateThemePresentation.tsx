"use client";

import styles from "@/app/presentation/GenerateTheme/GenerateThemePresentation.module.scss";
import AiGenerationLoading from "@/components/elements/AiGenerationLoading/AiGenerationLoading";
import RadioButtons from "@/components/elements/RadioButtons/RadioButtons";
import SectionTitle from "@/components/elements/SectionTitle/SectionTitle";
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
import { BackButton, LitUpBorders } from "@/components/ui/tailwind-buttons";
import { Textarea } from "@/components/ui/textarea";
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
import { FaMicrophone } from "react-icons/fa6";
import { IoChevronBack } from "react-icons/io5";

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
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
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

  // テーマ生成ボタンの状態更新
  useEffect(() => {
    if (aiGeneratedThemesArray.length > 0) {
      setIsThemeGenerated(true);
    }
  }, [aiGeneratedThemesArray]);

  // 無効な入力によるリトライ回数を2回許可する
  const handleRetryCount = () => {
    console.log("retryCount: ", retryCount);
    if (retryCount <= 2) {
      setRetryCount((prev) => prev + 1);
    } else {
      // リトライ回数が2回を超えた場合、エラーメッセージを表示
      setIsAlertModalOpen(true);
      console.log("isAlertModalOpen: ", isAlertModalOpen);
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
              <p className={styles.bound}>
                <span>
                  {
                    ThemeCategoryEnum[
                      ideaSession?.themeCategory as keyof typeof ThemeCategoryEnum
                    ]
                  }
                </span>
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
                <div className={styles.textareaContainer}>
                  <Textarea
                    id="answer"
                    name="answer"
                    placeholder="回答を入力してね。複数回答してもOKだよ。"
                    aria-describedby="theme-answer-error"
                    className={styles.textarea}
                  />
                  <FaMicrophone className={styles.microphone} />
                </div>
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
        </div>
      </div>

      {/* 戻るボタン */}
      <div className={styles.back}>
        <IoChevronBack className={styles.arrow} />
        <BackButton onClick={handleBack} type="button">
          BACK
        </BackButton>
      </div>
    </main>
  );
}

const SubmitButton = ({
  isThemeGenerated,
  handleRetryCount,
}: {
  isThemeGenerated: boolean | undefined;
  handleRetryCount: () => void;
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
