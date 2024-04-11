"use client";

import { IdeaMemoList } from "@/components/elements/IdeaMemoList/IdeaMemoList";
import { IdeaMemoType } from "@/types";

export default function IdeaMemos({
  filteredIdeaMemos,
  // query,
  // currentPage,
}: {
  filteredIdeaMemos: IdeaMemoType[];
  // query: string;
  // currentPage: number;
}) {
  // const [currentPage, setCurrentPage] = useState(1);

  // // 1ページに表示するメモの数
  // const lastIdeaMemoIndex = currentPage * ITEMS_PER_PAGE;
  // const firstIdeaMemoIndex = lastIdeaMemoIndex - ITEMS_PER_PAGE;
  // const currentIdeaMemos = ideaMemos.slice(
  //   firstIdeaMemoIndex,
  //   lastIdeaMemoIndex,
  // );

  return (
    <>
      <IdeaMemoList filteredIdeaMemos={filteredIdeaMemos} />
      {/* <div className={styles.pagination}>
        {ideaMemos.length > 0 && (
          <PaginationSection
            totalItems={ideaMemos.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div> */}
    </>
  );
}
