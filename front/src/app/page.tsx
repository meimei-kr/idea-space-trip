"use client";

import { useSession } from "next-auth/react";
import Login from "@/app/components/Login";
import Logout from "@/app/components/Logout";
import styles from "./page.module.css";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <main className={styles.main}>
      <div>
        {status === "authenticated" ? (
          <div>
            <p>セッション期限：{session.expires}</p>
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
