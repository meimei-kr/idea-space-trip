import styles from "@/components/elements/DangerButton/DangerButton.module.scss";

export default function DangerButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <button type="submit" className={styles.button}>
      {children}
    </button>
  );
}
