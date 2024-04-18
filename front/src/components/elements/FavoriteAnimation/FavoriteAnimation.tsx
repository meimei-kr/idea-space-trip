"use client";

import styles from "@/components/elements/FavoriteAnimation/FavoriteAnimation.module.scss";
import { Player } from "@lottiefiles/react-lottie-player";
import HeartLike from "public/json/favorite-animation.json";
import { useEffect, useRef } from "react";

export default function FavoriteAnimation({ isLiked }: { isLiked: boolean }) {
  const playerRef = useRef<Player>(null);

  useEffect(() => {
    if (!playerRef.current) return;

    if (isLiked) {
      playerRef.current.play();
    } else {
      playerRef.current.stop();
    }
  }, [isLiked]);

  return (
    <Player
      ref={playerRef}
      src={HeartLike}
      keepLastFrame={true}
      onEvent={(event) => {
        if (event === "load" && isLiked) {
          playerRef.current?.play();
        }
      }}
      className={styles.heart}
    />
  );
}
