import styles from "@/features/generate-theme/components/HintSection/HintSection.module.scss";
import { AiGeneratedAnswerType, PerspectiveType } from "@/types";
import Astronaut from "public/images/astronaut.svg";
import Blob from "public/images/white-blob.svg";

export default function HintSection({
  aiGeneratedAnswers,
  answerIndex,
  selectedPerspectives,
  perspectiveIndex,
}: {
  aiGeneratedAnswers: AiGeneratedAnswerType[];
  answerIndex: number;
  selectedPerspectives: PerspectiveType[];
  perspectiveIndex: number;
}) {
  return (
    <div className={styles.hint}>
      <div className={styles.blobContainer}>
        <div className={styles.decoration}>
          <div className={styles.fukidashi}>\ ヒント /</div>
          <Astronaut className={styles.astronaut} />
        </div>
        <div className={styles.blobCommentContainer}>
          <div className={styles.blobComment}>
            <span>{aiGeneratedAnswers[answerIndex]!.hint}</span>を
            {selectedPerspectives[perspectiveIndex]!.name}
            してみたらどうかな？
          </div>
          <Blob className={styles.blob} />
        </div>
      </div>
    </div>
  );
}
