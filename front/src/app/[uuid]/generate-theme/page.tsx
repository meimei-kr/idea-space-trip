import GenerateThemePresentation from "@/app/presentation/GenerateTheme/GenerateThemePresentation";
import { getAIGeneratedThemes } from "@/lib/ai-generated-themes";
import { getIdeaSessionInProgress } from "@/lib/idea-sessions";
import { AiGeneratedThemeType, Option } from "@/types";

export default async function page() {
  // 進行中のアイデアセッションを取得
  const ideaSession = await getIdeaSessionInProgress();

  // AIによるテーマ案を取得
  let aiGeneratedThemes: AiGeneratedThemeType[] | null = null;
  if (ideaSession?.uuid) {
    aiGeneratedThemes = await getAIGeneratedThemes(ideaSession.uuid);
  }

  // AIによるテーマ案を文字列配列に変換
  let aiGeneratedThemesArray: Option[] = [];
  if (aiGeneratedThemes) {
    aiGeneratedThemesArray = aiGeneratedThemes.map((aiGeneratedTheme) => {
      return {
        value:
          typeof aiGeneratedTheme?.theme === "string"
            ? aiGeneratedTheme.theme
            : "",
        label:
          typeof aiGeneratedTheme?.theme === "string"
            ? aiGeneratedTheme.theme
            : "",
      };
    });
  }

  return (
    <GenerateThemePresentation
      ideaSession={ideaSession}
      aiGeneratedThemesArray={aiGeneratedThemesArray}
    />
  );
}
