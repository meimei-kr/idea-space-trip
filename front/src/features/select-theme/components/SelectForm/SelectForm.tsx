"use client";

import ErrorAlert from "@/components/elements/ErrorAlert/ErrorAlert";
import ThemeCategoryRadioButtons from "@/components/elements/ThemeCategoryRadioButtons/ThemeCategoryRadioButtons";
import { LitUpBordersLg } from "@/components/ui/tailwind-buttons";
import styles from "@/features/select-theme/components/SelectForm/SelectForm.module.scss";
import type { ThemeCategoryState } from "@/lib/actions";
import { submitThemeCategory } from "@/lib/actions";
import type { Option } from "@/types";
import { ThemeCategoryEnum } from "@/utils/enums";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast";

export default function SelectForm({ uuid }: { uuid: string }) {
  // フォームの初期状態
  const initialState: ThemeCategoryState = {
    errors: {},
  };
  const [state, dispatch] = useFormState(submitThemeCategory, initialState);

  // フォームエラーがあった場合はトーストを表示
  useEffect(() => {
    if (state?.errors?.option) {
      toast.error("エラーがあるよ。確認してね。");
    }
  }, [state?.errors?.option]);

  // ラジオボタンの選択肢
  const options: Option[] = Object.entries(ThemeCategoryEnum).map(
    ([key, val]) => {
      return {
        value: key,
        label: val,
      };
    },
  );

  return (
    <form action={dispatch} className={styles.form} aria-label="form">
      {state?.errors?.option &&
        state?.errors?.option.map((error, index) => (
          <ErrorAlert id="theme-category-error" key={index} error={error} />
        ))}
      <ThemeCategoryRadioButtons
        options={options}
        ariaDescribedby="theme-category-error"
      />
      <input type="hidden" name="uuid" value={uuid} />
      <SubmitButton />
    </form>
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
