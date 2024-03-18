"use client";

import styles from "@/components/layouts/Header/Header.module.scss";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { COUNT_LIMIT } from "@/constants/constants";
import { useDialog } from "@/hooks/useDialog";
import { getAIUsageHistory } from "@/lib/ai-usage-history";
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

  // 途中セッションの中断時のパスを判定
  const checkPath = (ideaSession: IdeaSessionType) => {
    if (ideaSession.isAiAnswerGenerated) {
      return "generate-ideas"; // アイデア出し画面（回答生成後）
    }

    if (ideaSession.theme) {
      return "generate-ideas"; // アイデア出し画面（回答生成前）
    }

    if (ideaSession.isThemeDetermined) {
      return "input-theme"; // テーマ入力画面
    }

    if (
      ideaSession.isAiThemeGenerated ||
      ideaSession.themeCategory !== "unselected"
    ) {
      return "generate-theme"; // テーマ生成画面
    }

    return "check-theme"; // テーマ有無選択画面
  };

  // モーダルのYESボタンクリック時の処理
  const handleModalYesClick = (sessionInProgress: IdeaSessionType) => {
    const path = checkPath(sessionInProgress);
    router.push(`/${sessionInProgress.uuid}/${path}`);
  };

  // OpenAI APIの使用制限回数に達していないかチェック
  const checkOpenAIUsageLimit = async (): Promise<boolean> => {
    const aiUsage = await getAIUsageHistory();
    const answerGeneratedCount = aiUsage?.count;

    if (answerGeneratedCount && answerGeneratedCount >= COUNT_LIMIT) {
      return true;
    }
    return false;
  };

  const handleStartClick = async () => {
    // OpenAI APIの使用制限回数チェック
    const isReachedLimit = await checkOpenAIUsageLimit();
    if (isReachedLimit) {
      // 制限回数に達している場合、エラーメッセージを表示
      toast({
        duration: 10000,
        title: "AI利用回数制限超過",
        description:
          "頑張ったので、今日はAI利用回数制限に達したよ。出したアイデアをふりかえってみよう。",
        action: (
          <ToastAction
            altText="アイデアストックメモ"
            className="text-white bg-slate-950 hover:bg-slate-800 z-50 h-16 sm:5"
          >
            <Link href="/memos">
              アイデア<span className="block sm:inline">ストックメモ</span>
            </Link>
          </ToastAction>
        ),
      });
      return;
    }
    // 途中のセッションを取得
    const sessionInProgress = await getIdeaSessionInProgress();

    // 途中のセッションがない場合、新しいセッションを作成
    if (!sessionInProgress || !sessionInProgress.uuid) {
      const uuid = generateUUID();
      await createIdeaSession(uuid);
      router.push(`/${encodeURIComponent(uuid)}/check-theme`);
      return;
    }

    // 途中のセッションがある場合、続きから始めるか新しくスタートするかを選択
    const result = await openDialog();
    if (result) {
      // 続きから始める場合
      handleModalYesClick(sessionInProgress);
    } else {
      // 新しくスタートする場合
      await deleteIdeaSession(sessionInProgress.uuid);
      const uuid = generateUUID();
      await createIdeaSession(uuid);
      router.push(`/${encodeURIComponent(uuid)}/check-theme`);
    }
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
                <Link href="/idea-memos" onClick={menuFunction}>
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
