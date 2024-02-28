import styles from "@/app/presentation/CheckTheme/CheckThemePresentation.module.scss";
import BackButton from "@/components/elements/BackButton/BackButton";
import LinkButton from "@/components/elements/LinkButton/LinkButton";

export default function CheckThemePresentation() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <p className={styles.question}>考えたいテーマは、すでに決まってる？</p>
        <div className={styles.buttons}>
          <LinkButton href="#" color="pink" size="large" flicker="no-flicker">
            <div>YES</div>
          </LinkButton>
          <LinkButton
            href="#"
            color="light-blue"
            size="large"
            flicker="no-flicker"
          >
            <div>NO</div>
          </LinkButton>
        </div>
      </div>
      <div className={styles.back}>
        <BackButton />
      </div>
    </main>
  );
}
