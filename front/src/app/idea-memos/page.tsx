import IdeaMemosPresentation from "@/app/presentation/IdeaMemos/IdeaMemosPresentation";
import { getAllIdeaSessionsWithMemos } from "@/lib/idea-memos";
import { IdeaMemoType } from "@/types";

export default async function page() {
  const ideaMemos: IdeaMemoType[] = await getAllIdeaSessionsWithMemos();

  return <IdeaMemosPresentation ideaMemos={ideaMemos} />;
}
