import LinkButton from "@/components/elements/LinkButton/LinkButton";
import CommentArea from "@/features/select-mode/components/CommentArea/CommentArea";
import styles from "@/features/select-mode/components/IdeaMemoReviewSection/IdeaMemoReviewSection.module.scss";
import { PiNotepad } from "react-icons/pi";

export default function IdeaMemoReviewSection() {
  return (
    <div className={styles.modeSection}>
      <CommentArea>
        アイデア出しでひらめいたことを
        <br />
        見返してみよう！
      </CommentArea>
      <LinkButton href="/idea-memos" color="purple" size="large">
        <div className={styles.button}>
          <PiNotepad className={styles.icon} />
          <div>
            アイデアメモ<span>チェック</span>
          </div>
        </div>
      </LinkButton>
    </div>
  );
}
