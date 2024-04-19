import styles from "@/features/home/components/FeaturesSection/FeaturesSection.module.scss";
import One from "public/images/01.svg";
import Two from "public/images/02.svg";
import Three from "public/images/03.svg";
import FeaturesImg from "public/images/features.svg";
import { PiNotepadBold } from "react-icons/pi";
import { RiRobot2Line, RiUserVoiceLine } from "react-icons/ri";

export default function FeaturesSection() {
  return (
    <section id="features" className={styles.featuresWrapper}>
      <div className={styles.featuresContainer}>
        <div className={styles.features}>
          <FeaturesImg className={styles.featuresImg} data-testid="features" />
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
          <div className={styles.feature}>
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
              <span>
                ※ Firefoxなど一部ご利用いただけないブラウザがあります。
              </span>
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
  );
}
