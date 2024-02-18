import styles from "@/app/page.module.scss";
import Earth from "public/images/earth.svg";

export default async function Home() {
  return (
    <main>
      <section className={styles.heroContainer}>
        <Earth className={styles.earthImg} />
        <div className={styles.slogan}>
          <span>EXPLORE</span> <span>INFINITE</span> <span>CREATIVITY</span>
        </div>
        <div className={styles.hero}>
          <div className={styles.topLeftBg}>
            <div className={styles.topLeftDecorations}></div>
          </div>
          <div className={styles.blobContainer}>
            <div className={styles.blob}></div>
          </div>
          <div className={styles.topRightBg}>
            <div className={styles.topRightDecorations}></div>
          </div>
        </div>
      </section>
    </main>
  );
}
