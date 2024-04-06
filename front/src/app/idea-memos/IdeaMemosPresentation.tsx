import * as IdeaMemos from "@/features/idea-memos/components";
import { IdeaMemoType } from "@/types";

export default function IdeaMemosPresentation({
  ideaMemos,
}: {
  ideaMemos: IdeaMemoType[];
}) {
  return (
    <>
      {ideaMemos.length === 0 ? (
        <IdeaMemos.NoMemoDisplay />
      ) : (
        <IdeaMemos.MemosDisplay ideaMemos={ideaMemos} />
      )}
    </>
  );
}
