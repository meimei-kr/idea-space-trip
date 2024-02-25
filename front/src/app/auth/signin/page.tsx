import styles from "@/app/auth/signin/Signin.module.scss";
import SignInButton from "@/components/elements/SignInButton/SignInButton";
import Link from "next/link";

export default function SignIn() {
  return (
    <div className={styles.container}>
      <div className={styles.window}>
        <h1 className={styles.title}>Sign In</h1>
        <div className={styles.buttons}>
          <SignInButton provider="google" />
        </div>
        <div className={styles.description}>
          続けることにより、
          <Link href="/terms">利用規約</Link>
          に同意し、
          <Link href="/privacy">プライバシーポリシー</Link>
          を理解したうえで、個人情報の取り扱いに同意したものとみなされます。
        </div>
      </div>
    </div>
  );
}
