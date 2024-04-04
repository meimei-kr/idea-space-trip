import styles from "@/app/presentation/SelectMode/SelectModePresentation.module.scss";
import * as SelectMode from "@/features/select-mode/components";

export function SelectModePresentation() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <SelectMode.StartIdeaSessionSection />
          <SelectMode.IdeaMemoReviewSection />
        </div>
      </div>
    </main>
  );
}
