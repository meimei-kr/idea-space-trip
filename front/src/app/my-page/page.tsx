import styles from "@/app/my-page/MyPage.module.scss";
import DangerButton from "@/components/elements/DangerButton/DangerButton";

export default async function MyPage() {
  // const user = await getUser();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>ユーザー設定</h1>
          <form action="" className={styles.form}>
            <div className={styles.accountContainer}>
              <h2>
                現在ログイン中の<span>アカウント</span>
              </h2>
              <div className={styles.email}></div>
            </div>
            <DangerButton>アカウントを削除</DangerButton>
          </form>
        </div>
      </div>
    </div>
  );
}
