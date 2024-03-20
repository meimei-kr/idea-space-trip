import IdeaMemosUuidPresentation from "@/app/presentation/IdeaMemosUuid/IdeaMemosUuidPresentation";
import { getIdeaMemo } from "@/lib/idea-memos";

export default async function page({ params }: { params: { uuid: string } }) {
  const ideaMemo = await getIdeaMemo(params.uuid);
  return <IdeaMemosUuidPresentation ideaMemo={ideaMemo} />;
}
