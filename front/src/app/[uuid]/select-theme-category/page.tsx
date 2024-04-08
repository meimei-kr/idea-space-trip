import SelectThemeCategoryContainer from "@/app/[uuid]/select-theme-category/SelectThemeCategoryContainer";
import { getIdeaSessionInProgress } from "@/lib/idea-sessions";

export default async function SelectThemeCategory() {
  const ideaSession = await getIdeaSessionInProgress();
  return <SelectThemeCategoryContainer ideaSession={ideaSession} />;
}
