import styles from "@/app/[uuid]/check-theme/CheckTheme.module.scss";
import BackButton from "@/components/elements/BackButton/BackButton";
import LinkButton from "@/components/elements/LinkButton/LinkButton";

export default async function CheckTheme() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <p className={styles.question}>考えたいテーマは、すでに決まってる？</p>
        <div className={styles.buttons}>
          <LinkButton href="#" color="pink" size="large" flicker="no-flicker">
            <div>◯</div>
          </LinkButton>
          <LinkButton
            href="#"
            color="light-blue"
            size="large"
            flicker="no-flicker"
          >
            <div>✕</div>
          </LinkButton>
        </div>
      </div>
      <div className={styles.back}>
        <BackButton />
      </div>
    </main>
  );
}
