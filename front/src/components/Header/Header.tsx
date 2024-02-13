"use client";

import styles from "@/components/Header/Header.module.scss";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const menuFunction = () => {
    setOpenMenu((prev) => !prev);
  };
  const { status } = useSession();

  return (
    <header className={styles.header}>
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="IDEA SPACE TRIP Logo"
          height={56}
          width={128}
          priority
        />
      </Link>
      <nav
        className={`${styles.drawerMenu} ${openMenu ? styles.active : undefined}`}
      >
        <ul>
          <li>
            <Link href="/#about">
              <span className={styles.mainTitle}>About</span>
              <span className={styles.subTitle}>このアプリについて</span>
            </Link>
          </li>
          <li>
            <Link href="/#features">
              <span className={styles.mainTitle}>Features</span>
              <span className={styles.subTitle}>使える機能</span>
            </Link>
          </li>
          {status === "authenticated" ? (
            <>
              <li>
                <Link href="#">
                  <span className={styles.mainTitle}>Brainstorm</span>
                  <span className={styles.subTitle}>
                    アイデア出しセッション
                  </span>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <span className={styles.mainTitle}>Memo</span>
                  <span className={styles.subTitle}>
                    保存したアイデアを確認
                  </span>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <span className={styles.mainTitle}>MyPage</span>
                  <span className={styles.subTitle}>マイページ</span>
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link href="/auth/signin">
                <span className={styles.mainTitle}>Login</span>
                <span className={styles.subTitle}>ログイン</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <div className={styles.hamburger} onClick={() => menuFunction()}>
        <span className={openMenu ? styles.open : undefined}></span>
        <span className={openMenu ? styles.open : undefined}></span>
        <span className={openMenu ? styles.open : undefined}></span>
      </div>
    </header>
  );
}
