import styles from "@/features/idea-memos-uuid/components/CardFooter/CardFooter.module.scss";
import { IdeaMemoType } from "@/types";

export default function CardFooterOnViewMode({
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
