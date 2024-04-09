import Content from "@/features/generate-ideas/components/Content/Content";
import { getAiGeneratedAnswers } from "@/lib/ai-generated-answers";
import { getCurrentIdeaMemos } from "@/lib/idea-memos";
import { getIdeaSessionInProgress } from "@/lib/idea-sessions";
import { AiGeneratedAnswerType, IdeaMemoType, PerspectiveType } from "@/types";
import { perspectives, selectThreePerspectives } from "@/utils/perspectives";

export default async function page() {
  // 進行中のアイデアセッションを取得
  const ideaSession = await getIdeaSessionInProgress();

  let selectedPerspectives: PerspectiveType[] = []; // perspectivesの３つの観点
  let aiGeneratedAnswers: AiGeneratedAnswerType[] | null = null; // AIによる回答
  let myIdeas: IdeaMemoType[] | null = null; // 進行中のアイデアセッションで出したアイデア

  if (ideaSession) {
    // AIによる回答を取得
    aiGeneratedAnswers = await getAiGeneratedAnswers(ideaSession.uuid!);
    // 進行中のアイデアセッションで出したアイデアを取得
    myIdeas = await getCurrentIdeaMemos(ideaSession.uuid!);

    // すでに回答が生成済みであれば、観点を取得
    if (aiGeneratedAnswers) {
      const selectedPerspectivesKeys = [
        ...new Set(
          aiGeneratedAnswers
            .map((answer) => answer.perspective)
            .filter(
              (key): key is string => key !== undefined && key in perspectives,
            ),
        ),
      ];
      selectedPerspectives = selectedPerspectivesKeys.map((key) => {
        return {
          name: perspectives[key]!.name,
          description: perspectives[key]!.description,
        };
      });
    } else {
      // 回答が取得できなかった場合、ランダムにperspectivesから３つの観点を選択
      selectedPerspectives = selectThreePerspectives(perspectives);
    }
  }

  return (
    <Content
      ideaSession={ideaSession}
      aiAnswers={aiGeneratedAnswers}
      myIdeas={myIdeas}
      selectedPerspectives={selectedPerspectives}
    />
  );
}
