"use client";

import ErrorAlert from "@/components/elements/ErrorAlert/ErrorAlert";
import Textbox from "@/components/elements/Textbox/Textbox";
import { LitUpBordersLg } from "@/components/ui/tailwind-buttons";
import styles from "@/features/input-theme/components/Form/Form.module.scss";
import { ThemeState, submitTheme } from "@/lib/actions";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import {
  FaRegFaceFrown,
  FaRegFaceGrin,
  FaRegFaceGrinBeam,
} from "react-icons/fa6";
import { IoCheckboxOutline } from "react-icons/io5";

export default function Form({ uuid }: { uuid: string }) {
  // フォーム送信時の処理
  const initialState: ThemeState = {
    errors: {},
  };
  const [state, dispatch] = useFormState(submitTheme, initialState);

  // フォーム入力エラーがあれば、トースト表示
  useEffect(() => {
    if (state?.errors?.theme) {
      toast.error("エラーがあるよ。確認してね。");
    }
  }, [state?.errors?.theme]);

  return (
    <form action={dispatch} className={styles.form}>
      {state?.errors?.theme &&
        state?.errors?.theme.map((error, index) => (
          <ErrorAlert id="theme-error" key={index} error={error} />
        ))}
      <Textbox
        id="theme"
        name="theme"
        ariaDescribedby="theme-error"
        placeholder="255文字以内で入力してね"
      />
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
          <div className={styles.checkExample}>プログラミング学習アプリ</div>
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
