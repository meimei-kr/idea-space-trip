"use client";

import { signOut, useSession } from "next-auth/react";

export default function Logout() {
  const { status } = useSession();

  if (status === "authenticated") {
    return (
      <div>
        <button onClick={() => signOut()}>ログアウト</button>
      </div>
    );
  }

  return null;
}
