import styles from "@/app/presentation/Home/HomePresentation.module.scss";
import LinkButton from "@/components/elements/LinkButton/LinkButton";
import type { Session } from "next-auth";
import One from "public/images/01.svg";
import Two from "public/images/02.svg";
import Three from "public/images/03.svg";
import About from "public/images/about.svg";
import Earth from "public/images/earth.svg";
import Features from "public/images/features.svg";
import QuoteEnd from "public/images/quote-end.svg";
import QuoteStart from "public/images/quote-start.svg";
import { PiNotepadBold } from "react-icons/pi";
import { RiRobot2Line, RiUserVoiceLine } from "react-icons/ri";

export function HomePresentation({ session }: { session: Session | null }) {
  return (
    <main className={styles.main}>
      <section className={styles.heroWrapper}>
        <Earth className={styles.earthImg} data-testid="earth" />
        <div className={styles.slogan}>
          <span>EXPLORE</span> <span>INFINITE</span> <span>CREATIVITY</span>
        </div>
      </section>
      <section id="about" className={styles.aboutWrapper}>
        <div className={styles.aboutContainer}>
          <div className={styles.about}>
            <About className={styles.aboutImg} data-testid="about" />
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
                  <QuoteEnd
                    className={styles.quoteEnd}
                    data-testid="quote-end"
                  />
                </span>
              </div>
              <div className={styles.quoteItem}>
                <span>
                  こんなことができたらいいのに
                  <QuoteStart
                    className={styles.quoteStart}
                    data-testid="quote-start"
                  />
                  <QuoteEnd
                    className={styles.quoteEnd}
                    data-testid="quote-end"
                  />
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
      <section id="features" className={styles.featuresWrapper}>
        <div className={styles.featuresContainer}>
          <div className={styles.features}>
            <Features className={styles.featuresImg} data-testid="features" />
          </div>
          <div className={styles.featuresContent}>
            <div className={styles.feature}>
              <div className={styles.featuresTitle}>
                <div className={styles.titleNumber}>
                  <One className={styles.number} data-testid="one" />
                  <RiRobot2Line className={styles.icon} />
                </div>
                <span>AIとアイデア出し</span>
              </div>
              <div className={styles.featureDescription}>
                世の中には数多くのアイデア発想法がありますが、このアプリでは考え方が提示されるので、
                どのアイデア発想法を使おうかな？と迷う心配はありません。
                ヒントや回答例もAIが出してくれるので、アイデア出しに詰まらずに済みます。
              </div>
            </div>
            <div className={`${styles.feature} ${styles.noMvpFeature}`}>
              <div className={styles.featuresTitle}>
                <div className={styles.titleNumber}>
                  <Two className={styles.number} data-testid="two" />
                  <RiUserVoiceLine className={styles.icon} />
                </div>
                <span>音声入力対応</span>
              </div>
              <div className={styles.featureDescription}>
                手入力せずアイデアを記録したい方のために、音声入力機能を搭載しています。
                話すことでさらにアイデアが湧き出し、さらなるインスピレーションを引き出せます。
                <br />
                <span className={styles.noMvp}>※ 本リリースにて実装</span>
              </div>
            </div>
            <div className={styles.feature}>
              <div className={styles.featuresTitle}>
                <div className={styles.titleNumber}>
                  <Three className={styles.number} data-testid="three" />
                  <PiNotepadBold className={styles.icon} />
                </div>
                <span>アイデアメモ</span>
              </div>
              <div className={styles.featureDescription}>
                アイデアを自動で保存し、後で振り返ることができるストックメモ機能を備えています。
                メモから実行に移すも良し、新たなアイデアの発想につなげるも良し。貴重なひらめきを大切に保存しましょう。
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.loginWrapper}>
        <div className={styles.loginContainer}>
          {session ? (
            <LinkButton href="/select-mode" color="pink" size="large">
              NEXT PAGE
            </LinkButton>
          ) : (
            <LinkButton href="/auth/signin" color="pink" size="large">
              LOGIN
            </LinkButton>
          )}
        </div>
      </section>
    </main>
  );
}
