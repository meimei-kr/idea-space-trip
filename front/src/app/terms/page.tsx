import styles from "@/app/terms/Terms.module.scss";

export default function page() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>利用規約</h1>
          <div className={styles.introduction}>
            この利用規約（以下、「本規約」といいます。）は、IDEA SAPCE
            TRIP（以下、「当方」といいます。）がこのウェブサイト上で提供するサービス（以下、「本サービス」といいます。）の利用条件を定めるものです。
            登録ユーザーの皆さま（以下、「ユーザー」といいます。）には、本規約に従って、本サービスをご利用いただきます。
          </div>

          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>第1条（適用）</h2>
            <div className={styles.sectionText}>
              当方は、お客様から以下の情報を取得します。
              <ol>
                <li>
                  本規約は、ユーザーと当方との間の本サービスの利用に関わる一切の関係に適用されるものとします。
                </li>
                <li>
                  当方は本サービスに関し、本規約のほか、ご利用にあたってのルール等、各種の定め（以下、「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず、本規約の一部を構成するものとします。
                </li>
                <li>
                  本規約の規定が前条の個別規定の規定と矛盾する場合には、個別規定において特段の定めなき限り、個別規定の規定が優先されるものとします。
                </li>
              </ol>
            </div>
          </div>

          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>第2条（利用登録）</h2>
            <div className={styles.sectionText}>
              <ol>
                <li>
                  本規約に同意しないユーザーは、本サービスをご利用いただけません。ユーザーは、本サービスを利用することによって、本規約に有効かつ取り消し不能な同意をしたものとみなされます。
                </li>
                <li>
                  当方は、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあり、その理由については一切の開示義務を負わないものとします。
                  <ul>
                    <li>利用登録の申請に際して虚偽の事項を届け出た場合</li>
                    <li>本規約に違反したことがある者からの申請である場合</li>
                    <li>その他、当方が利用登録を相当でないと判断した場合</li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>

          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>第3条（アカウントの管理）</h2>
            <div className={styles.sectionText}>
              <ol>
                <li>
                  ユーザーは、本サービスへのアクセスにGoogleアカウントを使用します。ユーザーのGoogleアカウント管理は、Googleの利用規約およびプライバシーポリシーに従うものとします。
                </li>
                <li>
                  ユーザーは、自己のGoogleアカウントを安全に保つため、パスワードの強度、定期的なパスワード変更、二段階認証の設定など、Googleが推奨するセキュリティ対策を講じることを強く推奨します。
                </li>
                <li>
                  ユーザーは、いかなる場合にも、自己のGoogleアカウントを第三者に譲渡または貸与し、または第三者と共用することはできません。本サービスへのアクセスに使用されるGoogleアカウントの認証情報が第三者によって使用された場合、そのGoogleアカウントを所有するユーザー自身による利用とみなします。
                </li>
                <li>
                  ユーザーのGoogleアカウントが第三者によって使用されたことによって生じた損害について、一切の責任を負わないものとします。
                </li>
              </ol>
            </div>
          </div>

          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>第4条（禁止事項）</h2>
            <div className={styles.sectionText}>
              ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
              <ol>
                <li>法令または公序良俗に違反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>
                  当方、本サービスの他のユーザー、または第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為
                </li>
                <li>当方のサービスの運営を妨害するおそれのある行為</li>
                <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
                <li>不正アクセスをし、またはこれを試みる行為</li>
                <li>
                  当方、本サービスの他のユーザーまたは第三者の知的財産権、肖像権、プライバシー、名誉その他の権利または利益を侵害する行為
                </li>
                <li>
                  OpenAI APIを利用するにあたって、以下の行為
                  <ul>
                    <li>
                      プロンプトインジェクション攻撃を試みる、またはそれに類する行為
                    </li>
                    <li>不当に高頻度でAPIリクエストを送信する行為</li>
                    <li>OpenAIの利用規約またはポリシーに違反する行為</li>
                  </ul>
                </li>
                <li>その他、当方が不適切と判断する行為</li>
              </ol>
            </div>
          </div>

          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>
              第5条（本サービスの提供の停止等）
            </h2>
            <div className={styles.sectionText}>
              <ol>
                <li>
                  当方は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
                  <ul>
                    <li>
                      本サービスにかかるコンピュータシステムの保守点検または更新を行う場合
                    </li>
                    <li>
                      地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合
                    </li>
                    <li>
                      コンピュータまたは通信回線等が事故により停止した場合
                    </li>
                    <li>その他、当方が本サービスの提供が困難と判断した場合</li>
                  </ul>
                </li>
                <li>
                  当方は、本サービスの提供の停止または中断により、ユーザーまたは第三者が被ったいかなる不利益または損害についても、一切の責任を負わないものとします。
                </li>
              </ol>
            </div>
          </div>

          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>
              第6条（利用制限および登録抹消）
            </h2>
            <div className={styles.sectionText}>
              <ol>
                <li>
                  当方は、ユーザーが以下のいずれかに該当する場合には、事前の通知なく、投稿データを削除し、ユーザーに対して本サービスの全部もしくは一部の利用を制限しまたはユーザーとしての登録を抹消することができるものとします。
                  <ul>
                    <li>本規約のいずれかの条項に違反した場合</li>
                    <li>登録事項に虚偽の事実があることが判明した場合</li>
                    <li>当方からの連絡に対し、一定期間返答がない場合</li>
                    <li>
                      本サービスについて、最終の利用から一定期間利用がない場合
                    </li>
                    <li>
                      その他、当方が本サービスの利用を適当でないと判断した場合
                    </li>
                  </ul>
                </li>
                <li>
                  当方は、本条に基づき当方が行った行為によりユーザーに生じた損害について、一切の責任を負いません。
                </li>
              </ol>
            </div>
          </div>

          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>第7条（退会）</h2>
            <div className={styles.sectionText}>
              ユーザーは、当方の定める退会手続により、本サービスから退会できるものとします。
            </div>
          </div>

          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>
              第8条（保証の否認および免責事項）
            </h2>
            <div className={styles.sectionText}>
              <ol>
                <li>
                  当方は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
                </li>
                <li>
                  当方は、本サービスに起因してユーザーに生じたあらゆる損害について、当方の故意又は重過失による場合を除き、一切の責任を負いません。ただし、本サービスに関する当方とユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合、この免責規定は適用されません。
                </li>
                <li>
                  当方は、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。
                </li>
              </ol>
            </div>
          </div>

          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>
              第9条（サービス内容の変更等）
            </h2>
            <div className={styles.sectionText}>
              当方は、ユーザーへの事前の告知をもって、本サービスの内容を変更、追加または廃止することがあり、ユーザーはこれを承諾するものとします。
            </div>
          </div>

          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>第10条（利用規約の変更）</h2>
            <div className={styles.sectionText}>
              <ol>
                <li>
                  当方は以下の場合には、ユーザーの個別の同意を要せず、本規約を変更することができるものとします。
                  <ul>
                    <li>本規約の変更がユーザーの一般の利益に適合するとき。</li>
                    <li>
                      本規約の変更が本サービス利用契約の目的に反せず、かつ、変更の必要性、変更後の内容の相当性その他の変更に係る事情に照らして合理的なものであるとき。
                    </li>
                  </ul>
                </li>
                <li>
                  当方はユーザーに対し、前項による本規約の変更にあたり、事前に、本規約を変更する旨及び変更後の本規約の内容並びにその効力発生時期を通知します。
                </li>
              </ol>
            </div>
          </div>

          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>第11条（個人情報の取扱い）</h2>
            <div className={styles.sectionText}>
              当方は、本サービスの利用によって取得する個人情報については、当方「プライバシーポリシー」に従い適切に取り扱うものとします。
            </div>
          </div>

          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>第12条（通知または連絡）</h2>
            <div className={styles.sectionText}>
              ユーザーと当方との間の通知または連絡は、当方の定める方法によって行うものとします。当方は、ユーザーから、当方が別途定める方式に従った変更届け出がない限り、現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い、これらは、発信時にユーザーへ到達したものとみなします。
            </div>
          </div>

          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>
              第13条（権利義務の譲渡の禁止）
            </h2>
            <div className={styles.sectionText}>
              ユーザーは、当方の書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。
            </div>
          </div>

          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>第14条（準拠法・裁判管轄）</h2>
            <div className={styles.sectionText}>
              <ol>
                <li>本規約の解釈にあたっては、日本法を準拠法とします。</li>
                <li>
                  本サービスに関して紛争が生じた場合には、サービス提供者の居住地を管轄する裁判所を専属的合意管轄とします。
                </li>
              </ol>
            </div>
          </div>

          <div className={styles.end}>以上</div>
        </div>
      </div>
    </main>
  );
}
