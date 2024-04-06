import styles from "@/features/generate-theme/components/NextPerspectiveButton/NextPerspectiveButton.module.scss";
import { IoChevronForward } from "react-icons/io5";

export default function NextPerspectiveButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.nextButton}>
      {children}
      <IoChevronForward className={styles.nextArrow} />
    </div>
  );
}
