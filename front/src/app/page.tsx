import styles from "@/app/page.module.css";
import Login from "@/components/Login";
import Logout from "@/components/Logout";
import { authOptions } from "@/lib/options";
import { getServerSession } from "next-auth/next";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className={styles.main}>
      <div>
        {session ? (
          <div>
            <p>ようこそ、{session.user?.name}さん</p>
            <div>
              <Logout />
            </div>
          </div>
        ) : (
          <Login />
        )}
      </div>
    </main>
  );
}
