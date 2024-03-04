import InputThemePresentation from "@/app/presentation/InputTheme/InputThemePresentation";
import { getIdeaSessionInProgress } from "@/lib/idea-sessions";

export default async function InputTheme() {
  const ideaSession = await getIdeaSessionInProgress();

  return <InputThemePresentation ideaSession={ideaSession} />;
}
