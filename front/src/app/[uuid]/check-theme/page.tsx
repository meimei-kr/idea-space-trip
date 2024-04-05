import CheckThemeContainer from "@/app/[uuid]/check-theme/CheckThemeContainer";
import { getIdeaSessionInProgress } from "@/lib/idea-sessions";

export default async function page() {
  const ideaSession = await getIdeaSessionInProgress();
  return <CheckThemeContainer ideaSession={ideaSession} />;
}
