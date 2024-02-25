import styles from "@/app/select-mode/SelectMode.module.scss";
import LinkButton from "@/components/elements/LinkButton/LinkButton";

export default function SelectMode() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <LinkButton href="#" color="pink" size="large" flicker="no-flicker">
          <div>
            アイデア出し<span>スタート</span>
          </div>
        </LinkButton>
        <LinkButton
          href="#"
          color="light-blue"
          size="large"
          flicker="no-flicker"
        >
          <div>
            アイデア
            <span>ストックメモ</span>
          </div>
        </LinkButton>
      </div>
    </main>
  );
}
