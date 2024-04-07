import IdeaMemosPresentation from "@/app/idea-memos/(index)/IdeaMemosPresentation";
import { getAllIdeaMemos } from "@/lib/idea-memos";
import { IdeaMemoType } from "@/types";

export default async function page() {
  const ideaMemos: IdeaMemoType[] = await getAllIdeaMemos();
  return <IdeaMemosPresentation ideaMemos={ideaMemos} />;
}
