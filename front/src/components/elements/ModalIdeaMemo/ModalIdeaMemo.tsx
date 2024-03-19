"use client";

import AlienDecoration from "@/components/elements/AlienDecoration/AlienDecoration";
import styles from "@/components/elements/ModalIdeaMemo/ModalIdeaMemo.module.scss";
import SectionTitle from "@/components/elements/SectionTitle/SectionTitle";
import Textbox from "@/components/elements/Textbox/Textbox";
import { LitUpBorders, Simple } from "@/components/ui/tailwind-buttons";
import { IdeaMemoState, submitUpdateIdeaMemo } from "@/lib/actions";
import { IdeaMemoType } from "@/types";
import { PerspectiveEnum } from "@/utils/enums";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { RiPencilFill } from "react-icons/ri";

export default function ModalIdeaMemo({
  ideaMemo,
}: {
  ideaMemo: IdeaMemoType;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

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
                <div className={styles.cardBody}>
                  {/* 編集モードの場合 */}
                  <form action={ideaMemoStateDispatch} className={styles.form}>
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
                </div>
                <div className={styles.cardFooter}>
                  <div className={styles.backButton}>
                    <Simple type="button" onClick={handleBackClick}>
                      <IoMdArrowRoundBack />
                    </Simple>
                  </div>
                  {ideaMemo?.createdAt
                    ? new Date(ideaMemo.createdAt).toLocaleDateString("ja-JP")
                    : null}
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
                  <div className={styles.buttons}>
                    <Simple type="button" onClick={handleEditClick}>
                      <div className={styles.button}>
                        <RiPencilFill />
                        <div className={styles.buttonSentence}>編集</div>
                      </div>
                    </Simple>
                    {/* <form action="">
                      <input type="hidden" id="uuid" name="uuid" value={ideaMemo.uuid} />
                                      <Simple type="submit" disabled={}>
                                        <RiDeleteBin6Fill />
                                        削除
                                      </Simple>
                                    </form> */}
                  </div>
                  {ideaMemo?.createdAt
                    ? new Date(ideaMemo.createdAt).toLocaleDateString("ja-JP")
                    : null}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
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
