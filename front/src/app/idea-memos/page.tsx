import IdeaMemosPresentation from "@/app/presentation/IdeaMemos/IdeaMemosPresentation";
import { getAllIdeaMemos } from "@/lib/idea-memos";
import { IdeaMemoType } from "@/types";

export default async function page() {
  const ideaMemos: IdeaMemoType[] = await getAllIdeaMemos();
  return <IdeaMemosPresentation ideaMemos={ideaMemos} />;
}
