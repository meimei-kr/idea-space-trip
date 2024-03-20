"use client";

import styles from "@/app/presentation/IdeaMemosUuid/IdeaMemosUuidPresentation.module.scss";
import AlienDecoration from "@/components/elements/AlienDecoration/AlienDecoration";
import BackButton from "@/components/elements/BackButton/BackButton";
import SectionTitle from "@/components/elements/SectionTitle/SectionTitle";
import Textbox from "@/components/elements/Textbox/Textbox";
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
import { LitUpBorders, Simple } from "@/components/ui/tailwind-buttons";
import { IdeaMemoState, submitUpdateIdeaMemo } from "@/lib/actions";
import { deleteIdeaMemo } from "@/lib/idea-memos";
import { IdeaMemoType } from "@/types";
import { PerspectiveEnum } from "@/utils/enums";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { GiCancel } from "react-icons/gi";
import { RiDeleteBin6Fill, RiPencilFill } from "react-icons/ri";

export default function IdeaMemosUuidPresentation({
  ideaMemo,
}: {
  ideaMemo: IdeaMemoType;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const router = useRouter();

  // 削除ボタン押下時
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log("onSubmit is called");
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
    // 削除処理
    await deleteIdeaMemo(ideaMemo.uuid!);
    router.push("/idea-memos");
    router.refresh();
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
  >(submitUpdateIdeaMemo, initialIdeaMemoState);

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
              <AlienDecoration />
              {/* <GoHeart className={styles.heartIcon} /> */}
            </div>

            {isEditing ? (
              <>
                {/* 編集モードの場合 */}
                <form
                  action={async (formData: FormData) => {
                    await ideaMemoStateDispatch(formData);
                    setIsEditing(false);
                    router.refresh();
                  }}
                  className={styles.form}
                >
                  <div className={styles.cardBody}>
                    {ideaMemoState?.message && (
                      <div className={styles.message}>
                        {ideaMemoState.message}
                      </div>
                    )}
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
                          <div
                            key={index}
                            id="idea-error"
                            className={styles.error}
                          >
                            {error}
                          </div>
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
                          <div
                            key={index}
                            id="comment-error"
                            className={styles.error}
                          >
                            {error}
                          </div>
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
                      <SubmitDeleteButton />
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
                  「OK」を押すと、削除されてもとに戻せないので、注意してね。
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-gap">
                <AlertDialogCancel
                  className="text-slate-950"
                  onClick={handleCancel}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteOK}>
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
    <LitUpBorders type="submit" disabled={pending}>
      保存
    </LitUpBorders>
  );
};

const SubmitDeleteButton = () => {
  const { pending } = useFormStatus();

  return (
    <Simple type="submit" disabled={pending}>
      <div className={styles.button}>
        <RiDeleteBin6Fill />
        <div className={styles.buttonSentence}>削除</div>
      </div>
    </Simple>
  );
};
