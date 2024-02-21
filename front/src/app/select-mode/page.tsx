import styles from "@/app/select-mode/SelectMode.module.scss";
import Button from "@/components/elements/Button/Button";

export default function SelectMode() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <Button
          color="pink"
          size="large"
          type="button"
          href="#"
          flicker="no-flicker"
        >
          <div>
            アイデア出し<span>スタート</span>
          </div>
        </Button>
        <Button
          color="light-blue"
          size="large"
          type="button"
          href="#"
          flicker="no-flicker"
        >
          <div>
            アイデア
            <span>ストックメモ</span>
          </div>
        </Button>
      </div>
    </main>
  );
}
