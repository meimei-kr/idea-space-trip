"use client";

import styles from "@/app/presentation/SelectThemeCategory/SelectThemeCategoryPresentation.module.scss";
import BackButton from "@/components/elements/BackButton/BackButton";
import RadioButtons from "@/components/elements/RadioButtons/RadioButtons";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LitUpBorders } from "@/components/ui/tailwind-buttons";
import { useUUIDCheck } from "@/hooks/useUUIDCheck";
import type { ThemeCategoryState } from "@/lib/actions";
import { submitThemeCategory } from "@/lib/actions";
import type { Option } from "@/types";
import { IdeaSessionType } from "@/types";
import { ThemeCategoryEnum } from "@/utils/enums";
import { AlertCircle } from "lucide-react";
import Error from "next/error";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";

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
  const options: Option[] = Object.entries(ThemeCategoryEnum).map(
    ([key, val]) => {
      return {
        value: key,
        label: val,
      };
    },
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
          <p className={styles.question}>どの発明家になってみる？</p>
          <form action={dispatch} className={styles.form} aria-label="form">
            {state?.errors?.option &&
              state?.errors?.option.map((error, index) => (
                <Alert
                  variant="destructive"
                  id="theme-category-error"
                  key={index}
                  className="mb-1"
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ))}
            <RadioButtons
              options={options}
              ariaDescribedby="theme-category-error"
            />
            <input type="hidden" name="uuid" value={uuid} />
            <SubmitButton />
          </form>
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
