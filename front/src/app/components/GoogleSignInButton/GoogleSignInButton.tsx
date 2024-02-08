"use client";

import styles from "@/app/components/GoogleSignInButton/GoogleSignInButton.module.scss";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleSignInButton() {
  return (
    <div>
      <button onClick={() => signIn("google")} className={styles.button}>
        <FcGoogle className={styles.icon} />
        <span className={styles.sentence}>Sign in with Google</span>
      </button>
    </div>
  );
}
