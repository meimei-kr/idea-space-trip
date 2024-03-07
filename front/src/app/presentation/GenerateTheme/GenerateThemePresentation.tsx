"use client";

import styles from "@/app/presentation/GenerateTheme/GenerateThemePresentation.module.scss";
import RadioButtons from "@/components/elements/RadioButtons/RadioButtons";
import SectionTitle from "@/components/elements/SectionTitle/SectionTitle";
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
import { IdeaSessionType } from "@/types";
import { ThemeCategoryEnum, ThemeQuestionEnum } from "@/utils/enums";
import Error from "next/error";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { BsExclamationTriangle } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa6";
import { IoChevronBack } from "react-icons/io5";

export default function GenerateThemePresentation({
  ideaSession,
  aiGeneratedThemesArray,
}: {
  ideaSession: IdeaSessionType | null;
  aiGeneratedThemesArray: string[] | null;
}) {
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
          <form action={dispatchQuestion} className={styles.form}>
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
                    placeholder="回答を入力してね"
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
            <LitUpBorders type="submit">テーマ生成</LitUpBorders>
          </form>
          {aiGeneratedThemesArray && (
            <div className={styles.themeGenerated}>
              <p>こんなテーマはどうかな？</p>
              <form action={dispatchGeneratedThemes}>
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
      <div className={styles.back}>
        <IoChevronBack className={styles.arrow} />
        <BackButton onClick={handleBack} type="button">
          BACK
        </BackButton>
      </div>
    </main>
  );
}
