import styles from "@/app/privacy/Privacy.module.scss";
import Link from "next/link";

export default function page() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>プライバシーポリシー</h1>
          <div className={styles.introduction}>
            IDEA SPACE TRIP（以下、「当方」といいます。）は、
            本ウェブサイト上で提供するサービス（以下、「本サービス」といいます。）における、
            ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。
          </div>

          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>お客様から取得する情報</h2>
            <div className={styles.sectionText}>
              当方は、お客様から以下の情報を取得します。
              <ul>
                <li>氏名(ニックネームやペンネームも含む)</li>
                <li>メールアドレス</li>
                <li>
                  外部サービスでお客様が利用するID、その他外部サービスのプライバシー設定によりお客様が連携先に開示を認めた情報
                </li>
                <li>Cookie(クッキー)を用いて生成された識別情報</li>
                <li>
                  OSが生成するID、端末の種類、端末識別子等のお客様が利用するOSや端末に関する情報
                </li>
                <li>
                  当方ウェブサイトの滞在時間、入力履歴等の当方ウェブサイトにおけるお客様の利用履歴、行動履歴
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>お客様の情報を利用する目的</h2>
            <div className={styles.sectionText}>
              当方は、お客様から取得した情報を、以下の目的のために利用します。
              <ul>
                <li>
                  本サービスに関する登録の受付、お客様の本人確認、認証のため
                </li>
                <li>お客様の本サービスの利用履歴を管理するため</li>
                <li>
                  本サービスにおけるお客様の行動履歴を分析し、本サービスの維持改善に役立てるため
                </li>
                <li>お客様からのお問い合わせに対応するため</li>
                <li>当方の規約や法令に違反する行為に対応するため</li>
                <li>当方規約の変更等を通知するため</li>
                <li>以上の他、本サービスの提供、維持、保護及び改善のため</li>
              </ul>
            </div>
          </div>

          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>第三者提供</h2>
            <div className={styles.sectionText}>
              当方は、お客様から取得する情報のうち、個人データ（個人情報保護法第１６条第３項）に該当するものついては、あらかじめお客様の同意を得ずに、第三者（日本国外にある者を含みます。）に提供しません。
              <br />
              但し、次の場合は除きます。
              <ul>
                <li>個人データの取扱いを外部に委託する場合</li>
                <li>当方や本サービスが買収された場合</li>
                <li>
                  事業パートナーと共同利用する場合（具体的な共同利用がある場合は、その内容を別途公表します。）
                </li>
                <li>
                  その他、法律によって合法的に第三者提供が許されている場合
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>アクセス解析ツール</h2>
            <div className={styles.sectionText}>
              当方は、お客様のアクセス解析のために、「Googleアナリティクス」を利用しています。Googleアナリティクスは、トラフィックデータの収集のためにCookieを使用しています。トラフィックデータは匿名で収集されており、個人を特定するものではありません。Cookieを無効にすれば、これらの情報の収集を拒否することができます。詳しくはお使いのブラウザの設定をご確認ください。
              Googleアナリティクスについて、詳しくは
              <Link
                href="https://marketingplatform.google.com/about/analytics/terms/jp/"
                target="_blank"
                className={styles.link}
              >
                こちら
              </Link>
              からご確認ください。
            </div>
          </div>

          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>プライバシーポリシーの変更</h2>
            <div className={styles.sectionText}>
              当方は、必要に応じて、本ポリシーの内容を変更します。
              本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、お客様に通知することなく、変更することができるものとします。
              当方が別途定める場合を除いて、変更後のプライバシーポリシーは、本サービス中のウェブページに掲載したときから効力を生じるものとします。
            </div>
          </div>

          <div className={styles.date}>2024年03月30日 制定</div>
        </div>
      </div>
    </main>
  );
}
