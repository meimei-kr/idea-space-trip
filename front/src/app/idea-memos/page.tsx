import ModalHome from "@/components/elements/ModalHome/ModalHome";
import { getAllIdeaMemos } from "@/lib/idea-memos";
import { IdeaMemoType } from "@/types";

// モーダルが閉じているとき（アイデアメモ一覧画面）
export default async function page() {
  const ideaMemos: IdeaMemoType[] = await getAllIdeaMemos();
  const ideaMemo: IdeaMemoType = {};
  return <ModalHome open={false} ideaMemo={ideaMemo} ideaMemos={ideaMemos} />;
}
