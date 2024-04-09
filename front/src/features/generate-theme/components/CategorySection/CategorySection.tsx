import SectionTitle from "@/components/elements/SectionTitle/SectionTitle";
import styles from "@/features/generate-theme/components/CategorySection/CategorySection.module.scss";
import { IdeaSessionType } from "@/types";
import { ThemeCategoryEnum } from "@/utils/enums";

export default function CategorySection({
  ideaSession,
}: {
  ideaSession: IdeaSessionType | null;
}) {
  return (
    <div className={styles.themeCategory}>
      <div className={styles.categoryTitle}>
        <SectionTitle>カテゴリー</SectionTitle>
      </div>
      <div className={styles.categoryContainer}>
        <p>
          {
            ThemeCategoryEnum[
              ideaSession?.themeCategory as keyof typeof ThemeCategoryEnum
            ]
          }
        </p>
      </div>
    </div>
  );
}
