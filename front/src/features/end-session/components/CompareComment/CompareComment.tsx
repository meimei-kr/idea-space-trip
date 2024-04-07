import styles from "@/features/end-session/components/CompareComment/CompareComment.module.scss";
import Blob from "public/images/white-blob.svg";

export default function CompareComment({
  ideaCountDifference,
}: {
  ideaCountDifference: number;
}) {
  return (
    <div className={styles.endCommentContainer}>
      <Blob className={styles.blob} />
      <div className={styles.endComment}>
        前回のセッションと比べて、
        <br />
        <span>{ideaCountDifference}</span> 個
        <br />
        ひらめいたアイデアがふえたよ！
      </div>
    </div>
  );
}
