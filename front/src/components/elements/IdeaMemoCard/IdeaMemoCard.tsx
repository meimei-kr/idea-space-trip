"use client";

import styles from "@/components/elements/IdeaMemoCard/IdeaMemoCard.module.scss";
import SectionTitle from "@/components/elements/SectionTitle/SectionTitle";
import { IdeaMemoType } from "@/types";
import { PerspectiveEnum } from "@/utils/enums";
import Link from "next/link";
// import { GoHeart } from "react-icons/go";

export default function IdeaMemoCard({ ideaMemo }: { ideaMemo: IdeaMemoType }) {
  return (
    <Link
      href={`/idea-memos/${ideaMemo.uuid}`}
      className={styles.cardContainer}
    >
      <div className={styles.headerBody}>
        <div className={styles.cardHeader}>
          {/* <GoHeart className={styles.heartIcon} /> */}
        </div>
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
      </div>
      <div className={styles.cardFooter}>
        {ideaMemo?.createdAt
          ? new Date(ideaMemo.createdAt).toLocaleDateString("ja-JP")
          : null}
      </div>
    </Link>
  );
}
