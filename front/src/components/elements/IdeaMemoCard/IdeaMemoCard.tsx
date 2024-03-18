import AlienDecoration from "@/components/elements/AlienDecoration/AlienDecoration";
import styles from "@/components/elements/IdeaMemoCard/IdeaMemoCard.module.scss";
import SectionTitle from "@/components/elements/SectionTitle/SectionTitle";
import { IdeaMemoType } from "@/types";
import { getKeyByValue } from "@/utils/enums";

export default function IdeaMemoCard({ ideaMemo }: { ideaMemo: IdeaMemoType }) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeader}>
        <AlienDecoration />
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
              {getKeyByValue(ideaMemo.perspective!)}
            </div>
          </div>
        </div>
        <div className={styles.section}>
          <SectionTitle>ヒント</SectionTitle>
          <div className={styles.sectionContentContainer}>
            <div className={styles.sectionContent}>
              {ideaMemo.hint || "なし"}
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
      <div className={styles.cardFooter}>2024/3/18</div>
    </div>
  );
}
