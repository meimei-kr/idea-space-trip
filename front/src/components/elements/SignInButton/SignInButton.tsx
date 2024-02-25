"use client";

import styles from "@/components/elements/SignInButton/SignInButton.module.scss";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { IoPersonCircleOutline } from "react-icons/io5";

export default function SignInButton({ provider }: { provider: string }) {
  return (
    <div>
      <button
        onClick={() => signIn(provider, { callbackUrl: "/select-mode" })}
        className={styles.button}
      >
        {provider === "google" ? (
          <>
            <FcGoogle className={styles.icon} />
            <div className={styles.sentence}>Sign in with Google</div>
          </>
        ) : (
          <>
            <IoPersonCircleOutline className={styles.icon} />
            <div className={styles.sentence}>Sign in as Guest</div>
          </>
        )}
      </button>
    </div>
  );
}
