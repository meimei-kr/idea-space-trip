import styles from "@/app/idea-memos/IdeaMemos.module.scss";
import BackButton from "@/components/elements/BackButton/BackButton";
import { IdeaMemoList } from "@/components/elements/IdeaMemoList/IdeaMemoList";
import { PaginationSection } from "@/components/elements/Pagination/Pagination";
import Search from "@/components/elements/Search/Search";
import * as IdeaMemos from "@/features/idea-memos/components";
import {
  getAllIdeaMemos,
  getFilteredIdeaMemos,
  getIdeaMemosPages,
} from "@/lib/idea-memos";
import { IdeaMemoType } from "@/types";

export default async function page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const ideaMemos: IdeaMemoType[] = await getAllIdeaMemos();
  const totalPages = await getIdeaMemosPages(query);
  const currentPage =
    Math.max(1, Math.min(Number(searchParams?.page), totalPages)) || 1;
  const filteredIdeaMemos: IdeaMemoType[] = await getFilteredIdeaMemos(
    query,
    currentPage,
  );

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        {ideaMemos.length === 0 ? (
          <IdeaMemos.NoMemoDisplay />
        ) : (
          <>
            <div className={styles.header}>
              <Search />
            </div>
            <IdeaMemoList filteredIdeaMemos={filteredIdeaMemos} />
            <div className={styles.pagination}>
              <PaginationSection totalPages={totalPages} />
            </div>
          </>
        )}
      </div>
      <BackButton path="/select-mode" />
    </main>
  );
}
