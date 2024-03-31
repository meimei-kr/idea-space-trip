"use client";

import IdeaMemoCard from "@/components/elements/IdeaMemoCard/IdeaMemoCard";
import styles from "@/components/elements/IdeaMemoList/IdeaMemoList.module.scss";
import { IdeaMemoType } from "@/types";
import Aliens from "public/images/aliens.svg";

export const IdeaMemoList = ({ ideaMemos }: { ideaMemos: IdeaMemoType[] }) => {
  return (
    <>
      {ideaMemos.length === 0 ? (
        <div className={styles.noDataContainer}>
          <div className={styles.message}>
            <div>まだアイデアメモがないよ。</div>
            <Aliens className={styles.svg} />
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.content}>
            {ideaMemos.map((memo) => (
              <IdeaMemoCard key={memo.uuid!} ideaMemo={memo} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
