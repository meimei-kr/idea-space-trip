"use client";

import styles from "@/components/elements/IdeaMemoCard/IdeaMemoCard.module.scss";
import SectionTitle from "@/components/elements/SectionTitle/SectionTitle";
import { useTouch } from "@/context/global/TouchProvider";
import { createIdeaLike, deleteIdeaLike } from "@/lib/idea-likes";
import { IdeaMemoType } from "@/types";
import { PerspectiveEnum } from "@/utils/enums";
import Link from "next/link";
import HeartLike from "public/images/heart-like.svg";
import HeartUnlike from "public/images/heart-unlike.svg";
import { useState } from "react";
import toast from "react-hot-toast";

export default function IdeaMemoCard({ ideaMemo }: { ideaMemo: IdeaMemoType }) {
  const { isTouched, handleTouchStart, handleTouchEnd } = useTouch();
  const [isLiked, setIsLiked] = useState(ideaMemo.isLiked);

  const handleLike = async () => {
    try {
      await createIdeaLike(ideaMemo.uuid!);
      setIsLiked(true);
    } catch (error) {
      console.error(error);
      toast.error("お気に入り登録に失敗しました");
    }
  };

  const handleUnlike = async () => {
    try {
      await deleteIdeaLike(ideaMemo.uuid!);
      setIsLiked(false);
    } catch (error) {
      console.error(error);
      toast.error("お気に入り登録解除に失敗しました");
    }
  };

  return (
    <div
      className={`${styles.cardContainer} ${isTouched ? styles.touched : ""}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.cardHeader}>
        {isLiked ? (
          <HeartLike
            className={`${styles.heartLike} ${styles.heartBeat}`}
            onClick={handleUnlike}
          />
        ) : (
          <HeartUnlike className={styles.heartUnlike} onClick={handleLike} />
        )}
      </div>
      <Link href={`/idea-memos/${ideaMemo.uuid}`}>
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
              <div className={styles.sectionContent}>{ideaMemo.answer}</div>
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
      </Link>
    </div>
  );
}
