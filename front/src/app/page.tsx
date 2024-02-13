import styles from "@/app/page.module.css";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Login from "@/components/Login";
import Logout from "@/components/Logout";
import { authOptions } from "@/lib/options";
import { getServerSession } from "next-auth/next";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div>
          {session ? (
            <div>
              <p>ようこそ、{session.user?.name}さん</p>
              <div id="about">About</div>
              <div>
                <Logout />
              </div>
            </div>
          ) : (
            <Login />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
