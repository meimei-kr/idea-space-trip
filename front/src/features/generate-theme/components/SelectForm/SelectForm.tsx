"use client";

import ErrorAlert from "@/components/elements/ErrorAlert/ErrorAlert";
import RadioButtons from "@/components/elements/RadioButtons/RadioButtons";
import { LitUpBordersLg } from "@/components/ui/tailwind-buttons";
import styles from "@/features/generate-theme/components/SelectForm/SelectForm.module.scss";
import { useUUIDCheck } from "@/hooks/useUUIDCheck";
import { GeneratedThemesState, confirmTheme } from "@/lib/actions";
import type { IdeaSessionType, Option } from "@/types";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast";

export default function SelectForm({
  ideaSession,
  aiGeneratedThemesArray,
}: {
  ideaSession: IdeaSessionType | null;
  aiGeneratedThemesArray: Option[];
}) {
  const { uuid } = useUUIDCheck({ ideaSession });

  // 生成されたテーマの選択フォームの状態
  const initialGeneratedThemesState: GeneratedThemesState = {
    errors: {},
  };
  const [generatedThemesState, dispatchGeneratedThemes] = useFormState(
    async (prev: GeneratedThemesState | undefined, formData: FormData) => {
      const result = await confirmTheme(prev, formData);
      if (result?.errors?.option) {
        toast.error("エラーがあるよ。確認してね。");
      }
      return result;
    },
    initialGeneratedThemesState,
  );

  return (
    <form action={dispatchGeneratedThemes} className={styles.selectThemeForm}>
      {generatedThemesState?.errors?.option &&
        generatedThemesState?.errors?.option.map((error, index) => (
          <ErrorAlert id="generated_themes_error" key={index} error={error} />
        ))}
      <RadioButtons
        options={aiGeneratedThemesArray}
        ariaDescribedby="generated_themes_error"
      />
      <input type="hidden" name="uuid" value={uuid} />
      <ThemeSubmitButton />
    </form>
  );
}

const ThemeSubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <LitUpBordersLg type="submit" disabled={pending}>
      決定
    </LitUpBordersLg>
  );
};
