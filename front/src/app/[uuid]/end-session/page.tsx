import EndSessionContainer from "@/app/[uuid]/end-session/EndSessionContainer";
import { getIdeaMemosThisMonth } from "@/lib/idea-memos";
import { getLatestTwoIdeaSessionsWithMemos } from "@/lib/idea-sessions";
import { IdeaSessionType } from "@/types";

export default async function page() {
  const ideaSessionWithMemos: IdeaSessionType[] =
    await getLatestTwoIdeaSessionsWithMemos();
  const ideaSessionLatest = ideaSessionWithMemos[0] || null;
  const ideaSessionTheSecondLatest = ideaSessionWithMemos[1] || null;

  // 前回のセッションと出したアイデアの数を比較
  const ideaMemosLatest = ideaSessionLatest?.ideaMemos || null;
  const ideaMemosTheSecondLatest =
    ideaSessionTheSecondLatest?.ideaMemos || null;
  let ideaCountDifference = 0;
  if (ideaMemosLatest && ideaMemosTheSecondLatest) {
    ideaCountDifference =
      ideaMemosLatest.length - ideaMemosTheSecondLatest.length;
  }

  // 今月出したアイデアの数を取得
  const ideaMemosCountThisMonth = await getIdeaMemosThisMonth();

  return (
    <EndSessionContainer
      ideaSession={ideaSessionLatest}
      ideaMemos={ideaMemosLatest}
      ideaMemosCountThisMonth={ideaMemosCountThisMonth}
      ideaCountDifference={ideaCountDifference}
    />
  );
}
