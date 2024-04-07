import styles from "@/features/idea-memos-uuid/components/ButtonSection/ButtonSection.module.scss";

export default function ButtonSection({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.buttonContainer}>
      <div className={styles.buttons}>{children}</div>
    </div>
  );
}
