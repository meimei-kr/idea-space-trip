"use client";

import styles from "@/components/elements/IdeaMemoCard/IdeaMemoCard.module.scss";
import IdeaMemoCardFooter from "@/components/elements/IdeaMemoCardFooter/IdeaMemoCardFooter";
import IdeaMemoCardHeader from "@/components/elements/IdeaMemoCardHeader/IdeaMemoCardHeader";
import { useTouch } from "@/context/global/TouchProvider";
import { IdeaMemoType } from "@/types";
import Link from "next/link";
import IdeaMemoCardContent from "../IdeaMemoCardContent/IdeaMemoCardContent";

export default function IdeaMemoCard({ ideaMemo }: { ideaMemo: IdeaMemoType }) {
  const { isTouched, handleTouchStart, handleTouchEnd } = useTouch();

  return (
    <div
      className={`${styles.cardContainer} ${isTouched ? styles.touched : ""}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <IdeaMemoCardHeader ideaMemo={ideaMemo} />
      <Link
        href={`/idea-memos/${ideaMemo.uuid}`}
        className={styles.linkContainer}
      >
        <IdeaMemoCardContent ideaMemo={ideaMemo} />
        <IdeaMemoCardFooter ideaMemo={ideaMemo} />
      </Link>
    </div>
  );
}
