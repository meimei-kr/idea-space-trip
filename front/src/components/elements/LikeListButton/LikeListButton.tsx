"use client";

import styles from "@/components/elements/LikeListButton/LikeListButton.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FiHeart } from "react-icons/fi";

export default function LikeListButton() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isLikeListClicked, setIsLikeListClicked] = useState(
    new URLSearchParams(searchParams).get("favorites_mode") == "true",
  );

  const handleShowAll = () => {
    setIsLikeListClicked(false);

    const params = new URLSearchParams(searchParams);
    params.set("favorites_mode", "false");
    replace(`${pathname}?${params.toString()}`);
  };

  const handleShowLikeList = () => {
    setIsLikeListClicked(true);

    const params = new URLSearchParams(searchParams);
    params.set("favorites_mode", "true");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <button
      className={styles.likeListButton}
      onClick={isLikeListClicked ? handleShowAll : handleShowLikeList}
    >
      {isLikeListClicked ? (
        <FiHeart className={styles.like} />
      ) : (
        <FiHeart className={styles.unlike} />
      )}
    </button>
  );
}
