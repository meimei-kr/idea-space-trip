import IdeaMemos from "@/features/idea-memos/components/IdeaMemos/IdeaMemos";
import { IdeaMemoType } from "@/types";

export default function MemosDisplay({
  ideaMemos,
}: {
  ideaMemos: IdeaMemoType[];
}) {
  return (
    <>
      {/* <Search /> */}
      <IdeaMemos ideaMemos={ideaMemos} />
    </>
  );
}
