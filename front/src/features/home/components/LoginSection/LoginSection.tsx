"use client";

import LinkButton from "@/components/elements/LinkButton/LinkButton";
import styles from "@/features/home/components/LoginSection/LoginSection.module.scss";
import { useSession } from "next-auth/react";
// import { authOptions } from "@/lib/options";
// import { getServerSession } from "next-auth";

// export default async function LoginSection() {
export default function LoginSection() {
  // const session = await getServerSession(authOptions);
  const { data: session } = useSession();

  return (
    <section className={styles.loginWrapper}>
      <div className={styles.loginContainer}>
        {session ? (
          <LinkButton href="/select-mode" color="pink" size="large">
            NEXT PAGE
          </LinkButton>
        ) : (
          <LinkButton href="/auth/signin" color="pink" size="large">
            LOGIN
          </LinkButton>
        )}
      </div>
    </section>
  );
}
