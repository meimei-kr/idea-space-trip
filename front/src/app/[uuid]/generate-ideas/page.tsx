import GenerateIdeasPresentation from "@/app/presentation/GenerateIdeas/GenerateIdeasPresentation";
import { getAiGeneratedAnswers } from "@/lib/ai-generated-answers";
import { getIdeaSessionInProgress } from "@/lib/idea-sessions";
import { PerspectiveType, PerspectivesType } from "@/types";

// 観点リスト
const perspectives: PerspectivesType = {
  modify: {
    name: "変更",
    description: "色、動き、音、匂い、温度、形などを変えられないか考えてみよう",
  },
  substitute: {
    name: "代用",
    description: "他のものや、他の方法で代用できないか考えてみよう",
  },
  reverse: {
    name: "逆転",
    description: "上下、左右、表裏、立場、役割を逆にできないか考えてみよう",
  },
  combine: {
    name: "結合",
    description: "他のものと組み合わせて新しいものを作れないか考えてみよう",
  },
  magnify: {
    name: "拡大",
    description:
      "大きく、強く、高く、長く、厚くしてみるとどうなるか考えてみよう",
  },
  minify: {
    name: "縮小",
    description:
      "小さく、軽く、低く、短く、薄くしてみるとどうなるか考えてみよう",
  },
};

// 観点リストの中からランダムに３つ選ぶ
const selectThreePerspectives = (perspectives: PerspectivesType) => {
  const keys = Object.keys(perspectives);
  const selectedKeys: string[] = [];
  while (selectedKeys.length < 3) {
    const randomIndex = Math.floor(Math.random() * keys.length);
    const key = keys[randomIndex]!;
    if (!selectedKeys.includes(key)) {
      selectedKeys.push(key);
    }
  }
  // 選択されたキーに基づいて、日本語名と説明を取得
  const selectedPerspectives = selectedKeys.map((key) => {
    return {
      name: perspectives[key]!.name,
      description: perspectives[key]!.description,
    };
  });

  return selectedPerspectives;
};

export default async function page() {
  // 進行中のアイデアセッションを取得
  const ideaSession = await getIdeaSessionInProgress();

  // perspectivesの３つの観点
  let selectedPerspectives: PerspectiveType[] = [];

  // AIによる回答を取得
  let aiGeneratedAnswers = null;
  if (ideaSession) {
    aiGeneratedAnswers = await getAiGeneratedAnswers(ideaSession.uuid!);
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
    <GenerateIdeasPresentation
      ideaSession={ideaSession}
      selectedPerspectives={selectedPerspectives}
      answers={aiGeneratedAnswers}
    />
  );
}
