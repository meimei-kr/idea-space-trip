import { Simple } from "@/components/ui/tailwind-buttons";
import styles from "@/features/idea-memos-uuid/components/DeleteButton/DeleteButton.module.scss";
import { IdeaMemoType } from "@/types";
import { FormEvent } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function DeleteButton({
  onSubmit,
  ideaMemo,
}: {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  ideaMemo: IdeaMemoType;
}) {
  return (
    <form onSubmit={onSubmit}>
      <input type="hidden" id="uuid" name="uuid" value={ideaMemo.uuid} />
      <Simple type="submit">
        <div className={styles.button}>
          <RiDeleteBin6Fill />
          <div>削除</div>
        </div>
      </Simple>
    </form>
  );
}
