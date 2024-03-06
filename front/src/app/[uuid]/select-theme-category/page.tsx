import SelectThemeCategoryPresentation from "@/app/presentation/SelectThemeCategory/SelectThemeCategoryPresentation";
import { getIdeaSessionInProgress } from "@/lib/idea-sessions";

export default async function SelectThemeCategory() {
  const ideaSession = await getIdeaSessionInProgress();
  return <SelectThemeCategoryPresentation ideaSession={ideaSession} />;
}
