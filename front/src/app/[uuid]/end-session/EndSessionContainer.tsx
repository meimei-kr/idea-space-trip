import EndSessionPresentation from "@/app/[uuid]/end-session/EndSessionPresentation";
import * as EndSession from "@/features/end-session/components";
import { IdeaMemoType, IdeaSessionType } from "@/types";

export default function EndSessionContainer({
  ideaSession,
  ideaMemos,
  ideaMemosCountThisMonth,
  ideaCountDifference,
}: {
  ideaSession: IdeaSessionType | null;
  ideaMemos: IdeaMemoType[] | null;
  ideaMemosCountThisMonth: number;
  ideaCountDifference: number;
}) {
  return (
    <>
      {/* 前回のセッションと比べて、出したアイデアの数が増えた場合のメッセージ */}
      {ideaCountDifference > 0 && (
        <EndSession.CompareComment ideaCountDifference={ideaCountDifference} />
      )}

      <EndSession.ResultSection>
        <EndSession.ResultThisSession ideaMemos={ideaMemos} />
        <EndSession.ResultThisMonth
          ideaMemosCountThisMonth={ideaMemosCountThisMonth}
        />
      </EndSession.ResultSection>
      <EndSessionPresentation ideaSession={ideaSession} />
    </>
  );
}
