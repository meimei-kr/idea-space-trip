import styles from "@/app/idea-memos/IdeaMemos.module.scss";
import BackButton from "@/components/elements/BackButton/BackButton";
import Search from "@/components/elements/Search/Search";
import * as IdeaMemos from "@/features/idea-memos/components";
import { getAllIdeaMemos, getFilteredIdeaMemos } from "@/lib/idea-memos";
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
  const currentPage = Number(searchParams?.page) || 1;
  const ideaMemos: IdeaMemoType[] = await getAllIdeaMemos();
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
            <IdeaMemos.IdeaMemos
              filteredIdeaMemos={filteredIdeaMemos}
              // query={query}
              // currentPage={currentPage}
            />
          </>
        )}
      </div>
      <BackButton path="/select-mode" />
    </main>
  );
}
