"use client";

import styles from "@/app/presentation/InputTheme/InputThemePresentation.module.scss";
import { BackButton, LitUpBorders } from "@/components/ui/tailwind-buttons";
import { Textarea } from "@/components/ui/textarea";
import { useUUIDCheck } from "@/hooks/useUUIDCheck";
import { ThemeState, submitTheme } from "@/lib/actions";
import { IdeaSessionType } from "@/types";
import Error from "next/error";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { FaMicrophone } from "react-icons/fa";
import {
  FaRegFaceFrown,
  FaRegFaceGrin,
  FaRegFaceGrinBeam,
} from "react-icons/fa6";
import { IoCheckboxOutline, IoChevronBack } from "react-icons/io5";

export default function InputThemePresentation({
  ideaSession,
}: {
  ideaSession: IdeaSessionType | null;
}) {
  const router = useRouter();
  const { uuid, statusCode } = useUUIDCheck({ ideaSession });

  // フォーム送信時の処理
  const initialState: ThemeState = {
    errors: {},
  };
  const [state, dispatch] = useFormState(submitTheme, initialState);

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
            <div className={styles.textareaContainer}>
              <Textarea
                id="theme"
                name="theme"
                aria-describedby="theme-error"
                className={styles.textarea}
              />
              <FaMicrophone className={styles.microphone} />
            </div>
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
            <LitUpBorders type="submit">決定</LitUpBorders>
          </form>
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
