"use client";

import styles from "@/app/presentation/SelectThemeCategory/SelectThemeCategoryPresentation.module.scss";
import RadioButtons from "@/components/elements/RadioButtons/RadioButtons";
import { BackButton, LitUpBorders } from "@/components/ui/tailwind-buttons";
import { useUUIDCheck } from "@/hooks/useUUIDCheck";
import type { ThemeCategoryState } from "@/lib/actions";
import { submitThemeCategory } from "@/lib/actions";
import { IdeaSessionType } from "@/types";
import Error from "next/error";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { IoChevronBack } from "react-icons/io5";

export default function SelectThemePresentation({
  ideaSession,
}: {
  ideaSession: IdeaSessionType | null;
}) {
  const router = useRouter();
  const { uuid, statusCode } = useUUIDCheck({ ideaSession });

  // フォームの初期状態
  const initialState: ThemeCategoryState = {
    errors: {},
  };
  const [state, dispatch] = useFormState(submitThemeCategory, initialState);

  // ラジオボタンの選択肢
  const options = ["アプリ", "商品", "サービス"];

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
          <p className={styles.question}>どの発明家になってみる？</p>
          <form action={dispatch} className={styles.form} aria-label="form">
            {state?.errors?.option &&
              state?.errors?.option.map((error, index) => (
                <div
                  key={index}
                  id="theme-category-error"
                  className={styles.error}
                >
                  {error}
                </div>
              ))}
            <RadioButtons
              options={options}
              ariaDescribedby="theme-category-error"
            />
            <input type="hidden" name="uuid" value={uuid} />
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
