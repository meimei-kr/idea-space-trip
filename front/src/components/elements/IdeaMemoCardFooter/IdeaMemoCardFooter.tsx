import styles from "@/components/elements/IdeaMemoCardFooter/IdeaMemoCardFooter.module.scss";
import { IdeaMemoType } from "@/types";

export default function IdeaMemoCardFooter({
  ideaMemo,
}: {
  ideaMemo: IdeaMemoType;
}) {
  return (
    <div className={styles.cardFooter}>
      {ideaMemo?.createdAt
        ? new Date(ideaMemo.createdAt).toLocaleDateString("ja-JP")
        : null}
    </div>
  );
}
