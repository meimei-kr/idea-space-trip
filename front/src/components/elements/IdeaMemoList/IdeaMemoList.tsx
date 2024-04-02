"use client";

import IdeaMemoCard from "@/components/elements/IdeaMemoCard/IdeaMemoCard";
import styles from "@/components/elements/IdeaMemoList/IdeaMemoList.module.scss";
import { IdeaMemoType } from "@/types";

export const IdeaMemoList = ({
  currentIdeaMemos,
}: {
  currentIdeaMemos: IdeaMemoType[];
}) => {
  return (
    <div className={styles.content}>
      {currentIdeaMemos.map((memo) => (
        <IdeaMemoCard key={memo.uuid!} ideaMemo={memo} />
      ))}
    </div>
  );
};
