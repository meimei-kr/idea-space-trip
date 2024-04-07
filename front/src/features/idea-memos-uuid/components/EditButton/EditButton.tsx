"use client";

import { Simple } from "@/components/ui/tailwind-buttons";
import styles from "@/features/idea-memos-uuid/components/EditButton/EditButton.module.scss";
import { RiPencilFill } from "react-icons/ri";

export default function EditButton({
  handleEditClick,
}: {
  handleEditClick: () => void;
}) {
  return (
    <Simple type="button" onClick={handleEditClick}>
      <div className={styles.button}>
        <RiPencilFill />
        <div>編集</div>
      </div>
    </Simple>
  );
}
