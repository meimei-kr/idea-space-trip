"use client";

import styles from "@/app/presentation/IdeaMemos/IdeaMemosPresentation.module.scss";
import BackButton from "@/components/elements/BackButton/BackButton";
import { IdeaMemoList } from "@/components/elements/IdeaMemoList/IdeaMemoList";
import { PaginationSection } from "@/components/elements/Pagination/Pagination";
import { ITEMS_PER_PAGE } from "@/constants/constants";
import { IdeaMemoType } from "@/types";
import { useRouter } from "next/navigation";
import Aliens from "public/images/aliens.svg";
import { useEffect, useState } from "react";

export default function IdeaMemosPresentation({
  ideaMemos,
}: {
  ideaMemos: IdeaMemoType[];
}) {
  const [itemsPerPage] = useState(ITEMS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  // 1ページに表示するメモの数
  const lastIdeaMemoIndex = currentPage * itemsPerPage;
  const firstIdeaMemoIndex = lastIdeaMemoIndex - itemsPerPage;
  const currentIdeaMemos = ideaMemos.slice(
    firstIdeaMemoIndex,
    lastIdeaMemoIndex,
  );

  useEffect(() => {
    router.prefetch("select-mode");
  }, [router]);

  // 戻るボタンの処理
  const handleBack = () => {
    router.push("/select-mode");
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        {ideaMemos.length === 0 ? (
          <div className={styles.noDataContainer}>
            <div className={styles.message}>
              <div>まだアイデアメモがないよ。</div>
              <Aliens className={styles.svg} />
            </div>
          </div>
        ) : (
          <>
            <IdeaMemoList currentIdeaMemos={currentIdeaMemos} />
            <div className={styles.pagination}>
              {ideaMemos.length > 0 && (
                <PaginationSection
                  totalItems={ideaMemos.length}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              )}
            </div>
          </>
        )}
      </div>
      <BackButton onClick={handleBack} />
    </main>
  );
}
