import IdeaMemoCard from "@/components/elements/IdeaMemoCard/IdeaMemoCard";
import styles from "@/components/elements/IdeaMemoList/IdeaMemoList.module.scss";
import { IdeaMemoType } from "@/types";

export const IdeaMemoList = async ({
  filteredIdeaMemos,
}: {
  filteredIdeaMemos: IdeaMemoType[];
}) => {
  return (
    <div className={styles.content}>
      {filteredIdeaMemos.map((memo) => (
        <IdeaMemoCard key={memo.uuid!} ideaMemo={memo} />
      ))}
    </div>
  );
};
