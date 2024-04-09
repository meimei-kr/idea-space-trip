import styles from "@/features/home/components/AboutSection/AboutSection.module.scss";
import AboutImg from "public/images/about.svg";
import QuoteEnd from "public/images/quote-end.svg";
import QuoteStart from "public/images/quote-start.svg";

export default function AboutSection() {
  return (
    <section id="about" className={styles.aboutWrapper}>
      <div className={styles.aboutContainer}>
        <div className={styles.about}>
          <AboutImg className={styles.aboutImg} data-testid="about" />
        </div>
        <div className={styles.aboutBody}>
          <div className={styles.aboutTitle}>
            <div className={styles.aboutTitleText}>
              宇宙のように広がる
              <br />
              無限のアイデア
            </div>
          </div>
          <div className={styles.quoteArea}>
            <div className={styles.quoteItem}>
              <span>
                解決したい課題がある
                <QuoteStart
                  className={styles.quoteStart}
                  data-testid="quote-start"
                />
                <QuoteEnd className={styles.quoteEnd} data-testid="quote-end" />
              </span>
            </div>
            <div className={styles.quoteItem}>
              <span>
                こんなことができたらいいのに
                <QuoteStart
                  className={styles.quoteStart}
                  data-testid="quote-start"
                />
                <QuoteEnd className={styles.quoteEnd} data-testid="quote-end" />
              </span>
            </div>
          </div>
          <p className={styles.description}>
            そんな風に思いながら、具体的にどんなことをしたらいいのかアイデアに詰まってしまっていませんか？
          </p>
          <p className={styles.description}>
            このアプリなら、有名なアイデア発想法に沿って、AIのサポートを受けながらアイデア出しが行なえます。
          </p>
          <p className={styles.description}>
            さぁ、IDEA SPACE TRIPで、一緒に創造性の宇宙を旅してみましょう！
          </p>
        </div>
      </div>
    </section>
  );
}
