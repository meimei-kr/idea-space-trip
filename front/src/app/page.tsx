import { getServerSession } from "next-auth/next";
import Login from "@/app/components/Login";
import Logout from "@/app/components/Logout";
import styles from "@/app/page.module.css";
import { authOptions } from "@/app/lib/options";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className={styles.main}>
      <div>
        {session ? (
          <div>
            <p>ようこそ、{session.user?.name}さん</p>
            <img
              src={session.user?.image ?? ""}
              alt=""
              style={{ borderRadius: "50px" }}
            />
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
