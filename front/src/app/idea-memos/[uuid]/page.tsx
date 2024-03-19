import ModalHome from "@/components/elements/ModalHome/ModalHome";
import { getAllIdeaMemos, getIdeaMemo } from "@/lib/idea-memos";

// モーダルが開いたとき（アイデアメモ詳細・編集・削除画面）
export default async function page({ params }: { params: { uuid: string } }) {
  const ideaMemos = await getAllIdeaMemos();
  const ideaMemo = await getIdeaMemo(params.uuid);
  return <ModalHome open={true} ideaMemo={ideaMemo} ideaMemos={ideaMemos} />;
}
