import { IdeaMemoList } from "@/components/elements/IdeaMemoList/IdeaMemoList";
import { getFilteredIdeaMemos } from "@/lib/idea-memos";
import { IdeaMemoType } from "@/types";

export default async function IdeaMemos({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const filteredIdeaMemos: IdeaMemoType[] = await getFilteredIdeaMemos(
    query,
    currentPage,
  );

  return <IdeaMemoList filteredIdeaMemos={filteredIdeaMemos} />;
}
