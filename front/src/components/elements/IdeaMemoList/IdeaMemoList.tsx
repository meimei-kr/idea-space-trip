"use client";

import { IdeaMemoType } from "@/types";
import IdeaMemoCard from "../IdeaMemoCard/IdeaMemoCard";
import styles from "./IdeaMemoList.module.scss";

export const IdeaMemoList = async ({
  ideaMemos,
}: {
  ideaMemos: IdeaMemoType[];
}) => {
  return (
    <>
      {ideaMemos.length === 0 ? (
        <div className={styles.noDataContainer}>
          <div className={styles.message}>
            <div>まだアイデアメモがないよ。</div>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.content}>
            {ideaMemos.map((memo) => (
              <>
                <IdeaMemoCard key={memo.uuid!} ideaMemo={memo} />
              </>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
