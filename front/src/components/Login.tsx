"use client";

import { signIn, useSession } from "next-auth/react";

export default function Login() {
  const { status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status !== "authenticated") {
    return (
      <div>
        <p>あなたはログインしていません</p>
        <button onClick={() => signIn()}>ログイン</button>
      </div>
    );
  }
}
