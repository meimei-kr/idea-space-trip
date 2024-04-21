import styles from "@/app/[uuid]/generate-theme/GenerateTheme.module.scss";
import BackButton from "@/components/elements/BackButton/BackButton";
import Description from "@/components/elements/Description/Description";
import * as GenerateTheme from "@/features/generate-theme/components";
import { getAIGeneratedThemes } from "@/lib/ai-generated-themes";
import { getIdeaSessionInProgress } from "@/lib/idea-sessions";
import { AiGeneratedThemeType, Option } from "@/types";

export const maxDuration = 60;

export default async function page({ params }: { params: { uuid: string } }) {
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
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Description>
            <p>先程選んだカテゴリーと</p>
            <p>以下の質問への回答をもとに、</p>
            <p>AIがテーマを提案するよ</p>
          </Description>
          <GenerateTheme.CategorySection ideaSession={ideaSession} />

          {/* 回答送信フォーム */}
          <GenerateTheme.AnswerForm
            ideaSession={ideaSession}
            aiGeneratedThemesArray={aiGeneratedThemesArray}
          />

          {/* AIが生成したテーマ表示 */}
          {aiGeneratedThemesArray.length > 0 && (
            <GenerateTheme.ThemesDisplay>
              <GenerateTheme.SelectForm
                ideaSession={ideaSession}
                aiGeneratedThemesArray={aiGeneratedThemesArray}
              />
            </GenerateTheme.ThemesDisplay>
          )}
        </div>
      </div>

      <BackButton path={`/${params.uuid}/select-theme-category`} />
    </main>
  );
}
