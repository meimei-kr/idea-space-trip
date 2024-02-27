import { SelectModePresentation } from "@/app/presentation/SelectMode/SelectModePresentation";
import { getIdeaSessionInProgress } from "@/lib/idea-sessions";

export default async function SelectModeContainer() {
  const sessionInProgress = await getIdeaSessionInProgress();

  return <SelectModePresentation sessionInProgress={sessionInProgress} />;
}
