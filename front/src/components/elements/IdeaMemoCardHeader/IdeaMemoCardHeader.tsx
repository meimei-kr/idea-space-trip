"use client";

import styles from "@/components/elements/IdeaMemoCardHeader/IdeaMemoCardHeader.module.scss";
import { IdeaMemoType } from "@/types";
// import HeartLike from "public/images/heart-like.svg";
import FavoriteAnimation from "@/components/elements/FavoriteAnimation/FavoriteAnimation";
import { createIdeaLike, deleteIdeaLike } from "@/lib/idea-likes";
import { useState } from "react";
import toast from "react-hot-toast";

export default function IdeaMemoCardHeader({
  ideaMemo,
}: {
  ideaMemo: IdeaMemoType;
}) {
  const [isLiked, setIsLiked] = useState(ideaMemo.isLiked || false);

  const handleClick = async () => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);

    try {
      if (newIsLiked) {
        await createIdeaLike(ideaMemo.uuid!);
      } else {
        await deleteIdeaLike(ideaMemo.uuid!);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        newIsLiked
          ? "お気に入り登録に失敗しました"
          : "お気に入り登録解除に失敗しました",
      );
      setIsLiked(!newIsLiked);
    }
  };

  return (
    <div className={styles.cardHeader}>
      <button onClick={handleClick}>
        <FavoriteAnimation isLiked={isLiked} />
      </button>
    </div>
  );
}
