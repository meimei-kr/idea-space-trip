import LinkButton from "@/components/elements/LinkButton/LinkButton";
import styles from "@/features/home/components/LoginSection/LoginSection.module.scss";
import { Session } from "next-auth";

export default function LoginSection({ session }: { session: Session | null }) {
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
