import SectionTitle from "@/components/elements/SectionTitle/SectionTitle";
import styles from "@/features/generate-theme/components/PerspectiveSection/PerspectiveSection.module.scss";
import { PerspectiveType } from "@/types";

export default function PerspectiveSection({
  selectedPerspectives,
  perspectiveIndex,
}: {
  selectedPerspectives: PerspectiveType[];
  perspectiveIndex: number;
}) {
  return (
    <div className={styles.perspective}>
      <SectionTitle>考え方</SectionTitle>
      <div className={styles.perspectiveContentContainer}>
        <div className={styles.perspectiveContent}>
          <div>
            <div>
              <div className={styles.perspectiveMain}>
                <span>{selectedPerspectives[perspectiveIndex]!.name}</span>
                してみよう
              </div>
              <div className={styles.perspectiveSub}>
                {selectedPerspectives[perspectiveIndex]!.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
