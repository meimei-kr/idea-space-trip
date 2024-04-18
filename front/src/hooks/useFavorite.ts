"use client";

import { createIdeaLike, deleteIdeaLike } from "@/lib/idea-likes";
import { useState } from "react";
import toast from "react-hot-toast";

export const useFavorite = (initialIsLiked: boolean, uuid: string) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  const handleLike = async () => {
    try {
      await createIdeaLike(uuid!);
      setIsLiked(true);
    } catch (error) {
      console.error(error);
      toast.error("お気に入り登録に失敗しました");
    }
  };

  const handleUnlike = async () => {
    try {
      await deleteIdeaLike(uuid!);
      setIsLiked(false);
    } catch (error) {
      console.error(error);
      toast.error("お気に入り登録解除に失敗しました");
    }
  };

  return { isLiked, handleLike, handleUnlike };
};
