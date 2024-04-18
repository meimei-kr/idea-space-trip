import styles from "@/app/idea-memos/IdeaMemos.module.scss";
import BackButton from "@/components/elements/BackButton/BackButton";
import { IdeaMemoList } from "@/components/elements/IdeaMemoList/IdeaMemoList";
import LikeListButton from "@/components/elements/LikeListButton/LikeListButton";
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
    favorites_mode?: string;
  };
}) {
  const query = searchParams?.query || "";
  const favoritesMode = searchParams?.favorites_mode || "false";
  const totalPages = await getIdeaMemosPages(query, JSON.parse(favoritesMode));
  const currentPage =
    Math.max(1, Math.min(Number(searchParams?.page), totalPages)) || 1;
  const ideaMemos: IdeaMemoType[] = await getAllIdeaMemos();
  const filteredIdeaMemos: IdeaMemoType[] = await getFilteredIdeaMemos(
    query,
    currentPage,
    JSON.parse(favoritesMode),
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
              <LikeListButton />
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
