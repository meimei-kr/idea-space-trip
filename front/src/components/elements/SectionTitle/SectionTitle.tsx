import styles from "@/components/elements/SectionTitle/SectionTitle.module.scss";

export default function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.titleContainer}>
      <div className={styles.title}>{children}</div>
    </div>
  );
}
