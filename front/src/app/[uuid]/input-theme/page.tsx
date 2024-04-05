import InputThemeContainer from "@/app/[uuid]/input-theme/InputThemeContainer";
import { getIdeaSessionInProgress } from "@/lib/idea-sessions";

export default async function InputTheme() {
  const ideaSession = await getIdeaSessionInProgress();

  return <InputThemeContainer ideaSession={ideaSession} />;
}
