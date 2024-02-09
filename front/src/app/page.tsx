import styles from "@/app/page.module.css";
import Login from "@/components/Login";
import Logout from "@/components/Logout";
import { authOptions } from "@/lib/options";
import { getServerSession } from "next-auth/next";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className={styles.main}>
      <div>
        {session ? (
          <div>
            <p>ようこそ、{session.user?.name}さん</p>
            <Image
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
