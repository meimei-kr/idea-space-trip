import IdeaMemosUuidContainer from "@/app/idea-memos/(show)/[uuid]/IdeaMemosUuidContainer";
import { getIdeaMemo } from "@/lib/idea-memos";

export default async function page({ params }: { params: { uuid: string } }) {
  const ideaMemo = await getIdeaMemo(params.uuid);
  return <IdeaMemosUuidContainer ideaMemo={ideaMemo} />;
}
