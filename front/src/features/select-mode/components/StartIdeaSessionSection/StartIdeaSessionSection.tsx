import ButtonArea from "@/features/select-mode/components/ButtonArea/ButtonArea";
import CommentArea from "@/features/select-mode/components/CommentArea/CommentArea";
import styles from "@/features/select-mode/components/StartIdeaSessionSection/StartIdeaSessionSection.module.scss";

export default function StartIdeaSessionSection() {
  return (
    <div className={styles.modeSection}>
      <CommentArea>
        AIと一緒にアイデアをたくさん生み出そう！
        <br />
        1日3回までチャレンジできるよ。
      </CommentArea>
      <ButtonArea />
    </div>
  );
}
