"use client";

import styles from "@/components/elements/BackButton/BackButton.module.scss";
import { Playlist } from "@/components/ui/tailwind-buttons";
import { useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";

export default function BackButton({ path }: { path: string }) {
  const router = useRouter();
  const handleBack = () => {
    router.push(path);
  };

  return (
    <div className={styles.back}>
      <IoChevronBack className={styles.arrow} />
      <Playlist onClick={handleBack} type="button">
        もどる
      </Playlist>
    </div>
  );
}
