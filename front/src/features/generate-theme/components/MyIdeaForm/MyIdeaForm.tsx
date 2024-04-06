"use client";

import Textbox from "@/components/elements/Textbox/Textbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LitUpBorders } from "@/components/ui/tailwind-buttons";
import styles from "@/features/generate-theme/components/MyIdeaForm/MyIdeaForm.module.scss";
import { MyIdeaState, submitMyIdea } from "@/lib/actions";
import { PerspectiveType } from "@/types";
import { AlertCircle } from "lucide-react";
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
          <Alert
            className="mb-1"
            variant="destructive"
            id="idea-error"
            key={index}
          >
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ))}
      <Textbox
        id="idea"
        name="idea"
        ariaDescribedby="idea-error"
        placeholder="思いついたアイデアを入力してね（255文字以内）"
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
