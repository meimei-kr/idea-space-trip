import styles from "@/components/elements/IdeaMemoCardContent/IdeaMemoCardContent.module.scss";
import SectionTitle from "@/components/elements/SectionTitle/SectionTitle";
import { IdeaMemoType } from "@/types";
import { PerspectiveEnum } from "@/utils/enums";

export default function IdeaMemoCardContent({
  ideaMemo,
}: {
  ideaMemo: IdeaMemoType;
}) {
  return (
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
  );
}
