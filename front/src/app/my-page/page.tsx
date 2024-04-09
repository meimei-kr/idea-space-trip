import styles from "@/app/my-page/MyPage.module.scss";
import DeleteForm from "@/features/my-page/DeleteForm/DeleteForm";
import { getUser } from "@/lib/user";

export default async function MyPage() {
  const user = await getUser();

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>ユーザー設定</h1>
          <DeleteForm user={user} />
        </div>
      </div>
    </main>
  );
}
