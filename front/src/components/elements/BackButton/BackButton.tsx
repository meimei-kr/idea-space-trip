import styles from "@/components/elements/BackButton/BackButton.module.scss";
import { Playlist } from "@/components/ui/tailwind-buttons";
import { IoChevronBack } from "react-icons/io5";

export default function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <div className={styles.back}>
      <IoChevronBack className={styles.arrow} />
      <Playlist onClick={onClick} type="button">
        BACK
      </Playlist>
    </div>
  );
}
