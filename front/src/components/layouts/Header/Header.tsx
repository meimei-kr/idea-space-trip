"use client";

import styles from "@/components/layouts/Header/Header.module.scss";

import { useBodyFixed } from "@/hooks/useBodyFixed";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Logo from "public/images/logo.svg";
import { useEffect, useState } from "react";
import { toast as hotToast } from "react-hot-toast";

export default function Header() {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const { status } = useSession();
  const { bodyFixed, setBodyFixed } = useBodyFixed();

  // Drawer Menuの開閉
  const menuFunction = () => {
    setOpenMenu((prev) => !prev);
    setBodyFixed((prev) => !prev);
  };

  // ドロワーメニュー表示時に背景ページのスクロールを無効にするための処理
  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const hamburger = document.querySelector(".hamburgerButton") as HTMLElement;
    const isWideScreen = window.innerWidth >= 1024;
    const rightOffset = isWideScreen ? 80 : 24;

    if (openMenu && hamburger) {
      hamburger.style.right = `${rightOffset}px`;
    } else if (hamburger) {
      // ボタンのrightスタイルをスクロールバーの幅分だけ調整
      hamburger.style.right = `${rightOffset - scrollbarWidth}px`;
    }
  }, [openMenu]);

  // ログアウト処理
  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await signOut({ callbackUrl: "/" });
    hotToast.success("ログアウトしました");
  };

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoArea}>
        <Logo className={styles.logo} />
      </Link>
      <nav
        className={`${styles.drawerMenu} ${openMenu ? styles.active : undefined} ${bodyFixed ? styles.bodyFixed : undefined}`}
      >
        <ul>
          <li>
            <Link href="/" onClick={menuFunction}>
              <span className={styles.mainTitle}>TOP</span>
              <span className={styles.subTitle}>トップページ</span>
            </Link>
          </li>
          <li>
            <Link href="/#about" onClick={menuFunction}>
              <span className={styles.mainTitle}>ABOUT</span>
              <span className={styles.subTitle}>このアプリについて</span>
            </Link>
          </li>
          <li>
            <Link href="/#features" onClick={menuFunction}>
              <span className={styles.mainTitle}>FEATURES</span>
              <span className={styles.subTitle}>使える機能</span>
            </Link>
          </li>
          {status === "authenticated" ? (
            <>
              <li>
                <Link href="/select-mode" onClick={menuFunction}>
                  <span className={styles.mainTitle}>MODE</span>
                  <span className={styles.subTitle}>モード選択</span>
                </Link>
              </li>
              <li>
                <Link href="/my-page" onClick={menuFunction}>
                  <span className={styles.mainTitle}>MY PAGE</span>
                  <span className={styles.subTitle}>マイページ</span>
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
        className={`${styles.hamburger} hamburgerButton`}
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
