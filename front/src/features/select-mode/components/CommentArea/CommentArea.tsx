import styles from "@/features/select-mode/components/CommentArea/CommentArea.module.scss";

export default function CommentArea({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.comment}>{children}</div>;
}
