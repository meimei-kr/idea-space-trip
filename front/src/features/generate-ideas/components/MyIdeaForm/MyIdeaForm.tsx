"use client";

import ErrorAlert from "@/components/elements/ErrorAlert/ErrorAlert";
import Textbox from "@/components/elements/Textbox/Textbox";
import { LitUpBorders } from "@/components/ui/tailwind-buttons";
import { FORM_CHARACTER_LIMIT } from "@/constants/constants";
import styles from "@/features/generate-ideas/components/MyIdeaForm/MyIdeaForm.module.scss";
import { MyIdeaState, submitMyIdea } from "@/lib/actions";
import { PerspectiveType } from "@/types";
import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast";

export default function MyIdeaForm({
  setCount,
  uuid,
  selectedPerspectives,
  perspectiveIndex,
}: {
  setCount: React.Dispatch<React.SetStateAction<number>>;
  uuid: string;
  selectedPerspectives: PerspectiveType[];
  perspectiveIndex: number;
}) {
  const ref = useRef<HTMLFormElement>(null);

  // フォーム送信処理
  const initialMyIdeaState: MyIdeaState = {
    errors: {},
  };
  const [myIdeaState, myIdeaStateDispatch] = useFormState<
    MyIdeaState | undefined,
    FormData
  >(async (prev: MyIdeaState | undefined, formData: FormData) => {
    const result = await submitMyIdea(prev, formData);
    if (!result?.errors?.idea) {
      handleFormClear();
      setCount((prev) => prev + 1);
    }
    return result;
  }, initialMyIdeaState);

  // フォーム送信後エラーがなければ、フォームクリア
  const handleFormClear = () => {
    if (!myIdeaState?.errors?.idea) {
      ref?.current?.reset();
    }
  };

  // フォーム入力エラーがあった場合はトースト表示
  useEffect(() => {
    if (myIdeaState?.errors?.idea) {
      toast.error("エラーがあるよ。確認してね。");
    }
  }, [myIdeaState?.errors?.idea]);

  return (
    <form ref={ref} action={myIdeaStateDispatch} className={styles.form}>
      {myIdeaState?.errors?.idea &&
        myIdeaState?.errors?.idea.map((error, index) => (
          <ErrorAlert id="idea-error" key={index} error={error} />
        ))}
      <Textbox
        id="idea"
        name="idea"
        ariaDescribedby="idea-error"
        placeholder={`思いついたアイデアを入力してね（${FORM_CHARACTER_LIMIT}文字以内）`}
      />
      <input
        type="hidden"
        value={selectedPerspectives[perspectiveIndex]!.name}
        id="perspective"
        name="perspective"
      />
      <input type="hidden" value={uuid} id="uuid" name="uuid" />
      <SubmitButton />
    </form>
  );
}
const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <LitUpBorders type="submit" disabled={pending}>
      保存
    </LitUpBorders>
  );
};
