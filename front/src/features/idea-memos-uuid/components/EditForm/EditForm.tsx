"use client";

import ErrorAlert from "@/components/elements/ErrorAlert/ErrorAlert";
import SectionTitle from "@/components/elements/SectionTitle/SectionTitle";
import Textbox from "@/components/elements/Textbox/Textbox";
import { LitUpBordersLg } from "@/components/ui/tailwind-buttons";
import { FORM_CHARACTER_LIMIT } from "@/constants/constants";
import styles from "@/features/idea-memos-uuid/components/EditForm/EditForm.module.scss";
import { IdeaMemoState, submitUpdateIdeaMemo } from "@/lib/actions";
import { IdeaMemoType } from "@/types";
import { PerspectiveEnum } from "@/utils/enums";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast";

export default function EditMode({
  setIsEditing,
  ideaMemo,
  children,
}: {
  setIsEditing: (isEditing: boolean) => void;
  ideaMemo: IdeaMemoType;
  children: React.ReactNode;
}) {
  // フォーム送信処理
  const initialIdeaMemoState: IdeaMemoState = {
    errors: {},
    message: "",
  };
  const [ideaMemoState, ideaMemoStateDispatch] = useFormState<
    IdeaMemoState | undefined,
    FormData
  >(async (prev: IdeaMemoState | undefined, formData: FormData) => {
    const result = await submitUpdateIdeaMemo(prev, formData);
    if (result?.message) {
      setIsEditing(false);
      toast.success(result.message);
    }
    if (result?.errors?.idea || result?.errors?.comment) {
      toast.error("エラーがあるよ。確認してね。");
    }
    return result;
  }, initialIdeaMemoState);

  return (
    <form action={ideaMemoStateDispatch} className={styles.form}>
      <div className={styles.cardBody}>
        <div className={styles.section}>
          <SectionTitle>テーマ</SectionTitle>
          <div className={styles.sectionContentContainer}>
            <div className={styles.sectionContent}>
              {ideaMemo.ideaSession?.theme}
            </div>
          </div>
        </div>
        <div className={styles.section}>
          <SectionTitle>観点</SectionTitle>
          <div className={styles.sectionContentContainer}>
            <div className={styles.sectionContent}>
              {
                PerspectiveEnum[
                  ideaMemo.perspective as keyof typeof PerspectiveEnum
                ]
              }
            </div>
          </div>
        </div>
        <div className={styles.section}>
          <SectionTitle>ヒント</SectionTitle>
          <div className={styles.sectionContentContainer}>
            <div className={styles.sectionContent}>
              {ideaMemo.hint && ideaMemo.perspective
                ? `${ideaMemo.hint}を${
                    PerspectiveEnum[
                      ideaMemo.perspective as keyof typeof PerspectiveEnum
                    ]
                  }すると？`
                : "なし"}
            </div>
          </div>
        </div>
        <div className={styles.section}>
          <SectionTitle>回答</SectionTitle>

          {ideaMemoState?.errors?.idea &&
            ideaMemoState?.errors?.idea.map((error, index) => (
              <ErrorAlert id="idea-error" key={index} error={error} />
            ))}
          <Textbox
            id="idea"
            name="idea"
            ariaDescribedby="idea-error"
            placeholder={`${FORM_CHARACTER_LIMIT}文字以内`}
            defaultValue={ideaMemo.answer}
          />
        </div>
        <div className={styles.section}>
          <SectionTitle>コメント</SectionTitle>

          {ideaMemoState?.errors?.comment &&
            ideaMemoState?.errors?.comment.map((error, index) => (
              <ErrorAlert id="comment-error" key={index} error={error} />
            ))}
          <Textbox
            id="comment"
            name="comment"
            ariaDescribedby="comment-error"
            placeholder={`${FORM_CHARACTER_LIMIT}文字以内`}
            defaultValue={ideaMemo.comment ?? ""}
          />
        </div>
      </div>
      {children}
      <input type="hidden" id="uuid" name="uuid" value={ideaMemo.uuid} />
      <div className={styles.save}>
        <SubmitUpdateButton />
      </div>
    </form>
  );
}

const SubmitUpdateButton = () => {
  const { pending } = useFormStatus();

  return (
    <LitUpBordersLg type="submit" disabled={pending}>
      保存
    </LitUpBordersLg>
  );
};
