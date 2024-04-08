import styles from "@/features/generate-ideas/components/AnswerSection/AnswerSection.module.scss";

export default function AnswerSection({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.aiAnswerContainer}>{children}</div>;
}
