"use client";

import styles from "@/components/Header/Header.module.scss";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Logo from "public/images/logo.svg";
import { useState } from "react";

export default function Header() {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const { status } = useSession();

  const menuFunction = () => {
    setOpenMenu((prev) => !prev);
  };

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await signOut();
  };

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoArea}>
        <Logo className={styles.logo} />
      </Link>
      <nav
        className={`${styles.drawerMenu} ${openMenu ? styles.active : undefined}`}
      >
        <ul>
          <li>
            <Link href="/" onClick={menuFunction}>
              <span className={styles.mainTitle}>TOP</span>
              <span className={styles.subTitle}>トップページ</span>
            </Link>
          </li>
          <li>
            <Link href="#about" onClick={menuFunction}>
              <span className={styles.mainTitle}>ABOUT</span>
              <span className={styles.subTitle}>このアプリについて</span>
            </Link>
          </li>
          <li>
            <Link href="#features" onClick={menuFunction}>
              <span className={styles.mainTitle}>FEATURES</span>
              <span className={styles.subTitle}>使える機能</span>
            </Link>
          </li>
          {status === "authenticated" ? (
            <>
              <li>
                <Link href="#" onClick={menuFunction}>
                  <span className={styles.mainTitle}>BRAINSTORM</span>
                  <span className={styles.subTitle}>
                    アイデア出しセッション
                  </span>
                </Link>
              </li>
              <li>
                <Link href="#" onClick={menuFunction}>
                  <span className={styles.mainTitle}>MEMO</span>
                  <span className={styles.subTitle}>
                    保存したアイデアを確認
                  </span>
                </Link>
              </li>
              <li>
                <Link href="#" onClick={menuFunction}>
                  <span className={styles.mainTitle}>SETTINGS</span>
                  <span className={styles.subTitle}>登録情報設定</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  onClick={(e) => {
                    menuFunction();
                    handleLogout(e);
                  }}
                >
                  <span className={styles.mainTitle}>LOGOUT</span>
                  <span className={styles.subTitle}>ログアウト</span>
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link href="/auth/signin" onClick={menuFunction}>
                <span className={styles.mainTitle}>LOGIN</span>
                <span className={styles.subTitle}>ログイン</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <div
        className={styles.hamburger}
        onClick={() => menuFunction()}
        data-testid="hamburger"
      >
        <span className={openMenu ? styles.open : undefined}></span>
        <span className={openMenu ? styles.open : undefined}></span>
        <span className={openMenu ? styles.open : undefined}></span>
      </div>
    </header>
  );
}
