import SectionTitle from "@/components/elements/SectionTitle/SectionTitle";
import styles from "@/features/generate-ideas/components/MyIdeaSection/MyIdeaSection.module.scss";

export default function AnswerSection({
  scrollNextHintRef,
  children,
}: {
  scrollNextHintRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.answer} ref={scrollNextHintRef}>
      <SectionTitle>回答</SectionTitle>
      <div className={styles.answerContentContainer}>
        <div className={styles.answerContent}>{children}</div>
      </div>
    </div>
  );
}
