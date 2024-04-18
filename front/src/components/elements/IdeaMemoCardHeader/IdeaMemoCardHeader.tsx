"use client";

import styles from "@/components/elements/IdeaMemoCardHeader/IdeaMemoCardHeader.module.scss";
import { useFavorite } from "@/hooks/useFavorite";
import { IdeaMemoType } from "@/types";
import HeartLike from "public/images/heart-like.svg";
import HeartUnlike from "public/images/heart-unlike.svg";

export default function IdeaMemoCardHeader({
  ideaMemo,
}: {
  ideaMemo: IdeaMemoType;
}) {
  const { isLiked, handleLike, handleUnlike } = useFavorite(
    ideaMemo.isLiked!,
    ideaMemo.uuid!,
  );

  return (
    <div className={styles.cardHeader}>
      {isLiked ? (
        <HeartLike
          className={`${styles.heartLike} ${styles.heartBeat}`}
          onClick={handleUnlike}
        />
      ) : (
        <HeartUnlike className={styles.heartUnlike} onClick={handleLike} />
      )}
    </div>
  );
}
