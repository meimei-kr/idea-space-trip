import styles from "@/app/[uuid]/end-session/EndSession.module.scss";
import Description from "@/components/elements/Description/Description";
import * as EndSession from "@/features/end-session/components";
import { getIdeaMemosThisMonth } from "@/lib/idea-memos";
import { getLatestTwoIdeaSessionsWithMemos } from "@/lib/idea-sessions";
import { IdeaSessionType } from "@/types";
import Astronaut from "public/images/astronaut.svg";

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
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Description>アイデア出しセッション終了</Description>
          <div className={styles.astronautContainer}>
            <div className={styles.fukidashi}>\ お疲れさまでした /</div>
            <Astronaut className={styles.astronaut} />
          </div>

          {/* 前回のセッションと比べて、出したアイデアの数が増えた場合のメッセージ */}
          {ideaCountDifference > 0 && (
            <EndSession.CompareComment
              ideaCountDifference={ideaCountDifference}
            />
          )}

          <EndSession.ResultSection>
            <EndSession.ResultThisSession ideaMemos={ideaMemosLatest} />
            <EndSession.ResultThisMonth
              ideaMemosCountThisMonth={ideaMemosCountThisMonth}
            />
          </EndSession.ResultSection>

          <EndSession.ButtonSection ideaSession={ideaSessionLatest} />
        </div>
      </div>
    </main>
  );
}
