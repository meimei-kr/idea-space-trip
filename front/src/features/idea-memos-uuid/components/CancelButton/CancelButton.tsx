"use client";

import { Simple } from "@/components/ui/tailwind-buttons";
import styles from "@/features/idea-memos-uuid/components/CancelButton/CancelButton.module.scss";
import { GiCancel } from "react-icons/gi";

export default function CancelButton({ onClick }: { onClick: () => void }) {
  return (
    <div className={styles.buttonContainer}>
      <Simple type="button" onClick={onClick}>
        <div className={styles.cancelButton}>
          <GiCancel />
          キャンセル
        </div>
      </Simple>
    </div>
  );
}
