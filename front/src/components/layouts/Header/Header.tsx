"use client";

import styles from "@/components/layouts/Header/Header.module.scss";
import { useDialog } from "@/hooks/useDialog";
import {
  createIdeaSession,
  deleteIdeaSession,
  getIdeaSessionInProgress,
} from "@/lib/idea-sessions";
import { generateUUID } from "@/lib/uuid";
import { IdeaSessionType } from "@/types";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "public/images/logo.svg";
import { useState } from "react";

export default function Header() {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const { status } = useSession();

  // Drawer Menuの開閉
  const menuFunction = () => {
    setOpenMenu((prev) => !prev);
  };

  // ログアウト処理
  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await signOut({ callbackUrl: "/" });
  };

  // 途中のデータがある場合のアイデアセッションの開始時モーダル処理
  const { ModalDialog, openDialog } = useDialog();
  const router = useRouter();

  const handleStartClick = async () => {
    const sessionInProgress = await getIdeaSessionInProgress();
    if (!sessionInProgress) {
      const uuid = generateUUID();
      await createIdeaSession(uuid);
      router.push(`/${encodeURIComponent(uuid)}/check-theme`);
      return;
    }

    const result = await openDialog();
    if (result) {
      handleModalYesClick(sessionInProgress);
    } else {
      await deleteIdeaSession(sessionInProgress.uuid);
      const uuid = generateUUID();
      await createIdeaSession(uuid);
      router.push(`/${encodeURIComponent(uuid)}/check-theme`);
    }
  };

  const checkPath = (ideaSession: IdeaSessionType) => {
    if (ideaSession.isAIAnswerGenerated) {
      return "idea-generation"; // アイデア出し画面（回答生成後）
    }

    if (ideaSession.theme) {
      return "idea-generation"; // アイデア出し画面（回答生成前）
    }

    if (ideaSession.isThemeDetermined) {
      return "theme"; // テーマ入力画面
    }

    if (ideaSession.isAIThemeGenerated) {
      return "theme-generation"; // テーマ生成画面
    }

    if (ideaSession.category === 0) {
      return "select-theme-category"; // テーマカテゴリ選択画面
    }

    return "check-theme"; // テーマ有無選択画面
  };

  const handleModalYesClick = (sessionInProgress: IdeaSessionType) => {
    const path = checkPath(sessionInProgress);
    router.push(`/${sessionInProgress.uuid}/${path}`);
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
                <Link
                  href="#"
                  onClick={() => {
                    menuFunction();
                    handleStartClick();
                  }}
                >
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
      <ModalDialog
        title="途中のセッションがあります。"
        message={
          <>
            アイデア出しの途中で中断されたセッションがあります。続きから始めますか？
            <br />
            ※「新しくスタート」を選択すると、途中のセッションは削除されます。
          </>
        }
        trueVal="続きから"
        falseVal="新しくスタート"
      />
    </header>
  );
}
