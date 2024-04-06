"use client";

import { IdeaMemoList } from "@/components/elements/IdeaMemoList/IdeaMemoList";
import { PaginationSection } from "@/components/elements/Pagination/Pagination";
import { ITEMS_PER_PAGE } from "@/constants/constants";
import styles from "@/features/idea-memos/components/IdeaMemos/IdeaMemos.module.scss";
import { IdeaMemoType } from "@/types";
import { useState } from "react";

export default function IdeaMemos({
  ideaMemos,
}: {
  ideaMemos: IdeaMemoType[];
}) {
  const [currentPage, setCurrentPage] = useState(1);

  // 1ページに表示するメモの数
  const lastIdeaMemoIndex = currentPage * ITEMS_PER_PAGE;
  const firstIdeaMemoIndex = lastIdeaMemoIndex - ITEMS_PER_PAGE;
  const currentIdeaMemos = ideaMemos.slice(
    firstIdeaMemoIndex,
    lastIdeaMemoIndex,
  );
  return (
    <>
      <IdeaMemoList currentIdeaMemos={currentIdeaMemos} />
      <div className={styles.pagination}>
        {ideaMemos.length > 0 && (
          <PaginationSection
            totalItems={ideaMemos.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </>
  );
}
