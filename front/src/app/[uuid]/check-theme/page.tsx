import CheckThemePresentation from "@/app/presentation/CheckTheme/CheckThemePresentation";
import { getIdeaSessionInProgress } from "@/lib/idea-sessions";

export default async function CheckTheme() {
  const ideaSession = await getIdeaSessionInProgress();
  return <CheckThemePresentation ideaSession={ideaSession} />;
}
