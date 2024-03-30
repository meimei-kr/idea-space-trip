"use client";

import styles from "@/app/presentation/IdeaMemosUuid/IdeaMemosUuidPresentation.module.scss";
import BackButton from "@/components/elements/BackButton/BackButton";
import SectionTitle from "@/components/elements/SectionTitle/SectionTitle";
import Textbox from "@/components/elements/Textbox/Textbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { LitUpBordersLg, Simple } from "@/components/ui/tailwind-buttons";
import { IdeaMemoState, submitUpdateIdeaMemo } from "@/lib/actions";
import { deleteIdeaMemo } from "@/lib/idea-memos";
import { IdeaMemoType } from "@/types";
import { PerspectiveEnum } from "@/utils/enums";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import { GiCancel } from "react-icons/gi";
import { RiDeleteBin6Fill, RiPencilFill } from "react-icons/ri";

export default function IdeaMemosUuidPresentation({
  ideaMemo,
}: {
  ideaMemo: IdeaMemoType;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  // 削除ボタン押下時
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsConfirmDialogOpen(true);
  };

  // 削除確認ダイアログのキャンセルボタン押下時
  const handleCancel = () => {
    setIsConfirmDialogOpen(false);
  };

  // 削除確認ダイアログのOKボタン押下時
  const handleDeleteOK = async () => {
    setIsConfirmDialogOpen(false);
    setIsDeleting(true);
    try {
      // 削除処理
      await deleteIdeaMemo(ideaMemo.uuid!);
      router.push("/idea-memos");
      router.refresh();
      toast.success("アイデアメモを削除しました");
    } catch (error) {
      toast.error("アイデアメモの削除に失敗しました");
    } finally {
      setIsDeleting(false);
    }
  };

  // 編集ボタン押下時
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // 編集モードで戻るボタン押下時
  const handleBackClick = () => {
    setIsEditing(false);
  };

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
      router.refresh();
      toast.success(result.message);
    }
    return result;
  }, initialIdeaMemoState);

  // フォームエラーがあった場合はトーストを表示
  useEffect(() => {
    if (ideaMemoState?.errors?.idea || ideaMemoState?.errors?.comment) {
      toast.error("エラーがあるよ。確認してね。");
    }
  }, [ideaMemoState?.errors?.idea, ideaMemoState?.errors?.comment]);

  // 戻るボタンの処理
  const handleBack = () => {
    router.push("/idea-memos");
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.cardContainer}>
            <div className={styles.cardHeader}>
              {/* <GoHeart className={styles.heartIcon} /> */}
            </div>

            {isEditing ? (
              <>
                {/* 編集モードの場合 */}
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
                          <Alert
                            variant="destructive"
                            id="idea-error"
                            key={index}
                            className="mb-1"
                          >
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                          </Alert>
                        ))}
                      <Textbox
                        id="idea"
                        name="idea"
                        ariaDescribedby="idea-error"
                        placeholder="255文字以内"
                        defaultValue={ideaMemo.answer}
                      />
                    </div>
                    <div className={styles.section}>
                      <SectionTitle>コメント</SectionTitle>

                      {ideaMemoState?.errors?.comment &&
                        ideaMemoState?.errors?.comment.map((error, index) => (
                          <Alert
                            variant="destructive"
                            id="comment-error"
                            key={index}
                            className="mb-1"
                          >
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                          </Alert>
                        ))}
                      <Textbox
                        id="comment"
                        name="comment"
                        ariaDescribedby="comment-error"
                        placeholder="255文字以内"
                        defaultValue={ideaMemo.comment ?? ""}
                      />
                    </div>
                  </div>
                  <div className={styles.cardFooter}>
                    {ideaMemo?.createdAt
                      ? new Date(ideaMemo.createdAt).toLocaleDateString("ja-JP")
                      : null}
                  </div>
                  <input
                    type="hidden"
                    id="uuid"
                    name="uuid"
                    value={ideaMemo.uuid}
                  />
                  <div className={styles.save}>
                    <SubmitUpdateButton />
                  </div>
                </form>
                <div className={styles.buttonContainer}>
                  <Simple type="button" onClick={handleBackClick}>
                    <div className={styles.cancelButton}>
                      <GiCancel />
                      キャンセル
                    </div>
                  </Simple>
                </div>
              </>
            ) : (
              <>
                {/* 詳細表示モードの場合 */}
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

                    <div className={styles.sectionContentContainer}>
                      <div className={styles.sectionContent}>
                        {ideaMemo.answer}
                      </div>
                    </div>
                  </div>
                  <div className={styles.section}>
                    <SectionTitle>コメント</SectionTitle>

                    <div className={styles.sectionContentContainer}>
                      <div className={styles.sectionContent}>
                        {ideaMemo.comment || "なし"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.cardFooter}>
                  {ideaMemo?.createdAt
                    ? new Date(ideaMemo.createdAt).toLocaleDateString("ja-JP")
                    : null}
                </div>
                <div className={styles.buttonContainer}>
                  <div className={styles.buttons}>
                    <Simple type="button" onClick={handleEditClick}>
                      <div className={styles.button}>
                        <RiPencilFill />
                        <div className={styles.buttonSentence}>編集</div>
                      </div>
                    </Simple>
                    <form onSubmit={onSubmit}>
                      <input
                        type="hidden"
                        id="uuid"
                        name="uuid"
                        value={ideaMemo.uuid}
                      />
                      <Simple type="submit">
                        <div className={styles.button}>
                          <RiDeleteBin6Fill />
                          <div className={styles.buttonSentence}>削除</div>
                        </div>
                      </Simple>
                    </form>
                  </div>
                </div>
              </>
            )}
          </div>
          {/* 削除確認ダイアログ */}
          <AlertDialog open={isConfirmDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-slate-950">
                  本当に削除する？
                </AlertDialogTitle>
                <AlertDialogDescription>
                  「OK」を押すと、削除されて元に戻せないので、注意してね。
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-gap">
                <AlertDialogCancel
                  className="text-slate-950"
                  onClick={handleCancel}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteOK}
                  disabled={isDeleting}
                  className="text-red-500 bg-red-200 hover:bg-red-100"
                >
                  OK
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <BackButton onClick={handleBack} />
    </main>
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
