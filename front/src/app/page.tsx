import styles from "@/app/page.module.scss";
import About from "public/images/about.svg";
import Earth from "public/images/earth.svg";
import QuoteEnd from "public/images/quote-end.svg";
import QuoteStart from "public/images/quote-start.svg";

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
      <section id="about" className={styles.aboutWrapper}>
        <div className={styles.aboutContainer}>
          <div className={styles.about}>
            <About className={styles.aboutImg} />
          </div>
          <div className={styles.aboutBody}>
            <div className={styles.aboutTitle}>
              <div className={styles.aboutTitleText}>
                宇宙のように広がる <br />
                無限のアイデア
              </div>
            </div>
            <div className={styles.quoteArea}>
              <p>
                <span>
                  <QuoteStart className={styles.quoteStart} />
                </span>
                解決したい課題がある
                <span>
                  <QuoteEnd className={styles.quoteEnd} />
                </span>
              </p>
              <p>
                <span>
                  <QuoteStart className={styles.quoteStart} />
                </span>
                こんなことができたらいいのに
                <span>
                  <QuoteEnd className={styles.quoteEnd} />
                </span>
              </p>
            </div>
            <p className={styles.description}>
              そんな風に思いながら、具体的にどんなことをしたらいいのかアイデアに詰まってしまっていませんか？
            </p>
            <p>
              このアプリなら、有名なアイデア発想法に沿って、AIのサポートを受けながらアイデア出しが行なえます。
            </p>
            <p>
              さぁ、IDEA SPACE TRIPで、一緒に創造性の宇宙を旅してみましょう！{" "}
              <br />
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
