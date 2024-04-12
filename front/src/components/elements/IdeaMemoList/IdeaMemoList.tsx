import IdeaMemoCard from "@/components/elements/IdeaMemoCard/IdeaMemoCard";
import styles from "@/components/elements/IdeaMemoList/IdeaMemoList.module.scss";
import { getFilteredIdeaMemos } from "@/lib/idea-memos";
import { IdeaMemoType } from "@/types";

export const IdeaMemoList = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const filteredIdeaMemos: IdeaMemoType[] = await getFilteredIdeaMemos(
    query,
    currentPage,
  );
  return (
    <div className={styles.content}>
      {filteredIdeaMemos.map((memo) => (
        <IdeaMemoCard key={memo.uuid!} ideaMemo={memo} />
      ))}
    </div>
  );
};
