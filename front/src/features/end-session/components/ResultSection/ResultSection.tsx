import styles from "@/features/end-session/components/ResultSection/ResultSection.module.scss";

export default function ResultSection({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.resultWrapper}>{children}</div>;
}
