"use client";

import styles from "@/app/presentation/SelectMode/SelectModePresentation.module.scss";
import Button from "@/components/elements/Button/Button";
import LinkButton from "@/components/elements/LinkButton/LinkButton";
import { useDialog } from "@/hooks/useDialog";
import {
  createIdeaSession,
  deleteIdeaSession,
  getIdeaSessionInProgress,
} from "@/lib/idea-sessions";
import { generateUUID } from "@/lib/uuid";
import { IdeaSessionType } from "@/types";
import { useRouter } from "next/navigation";

export function SelectModePresentation() {
  // 途中のデータがある場合のアイデアセッションの開始時モーダル処理
  const { ModalDialog, openDialog } = useDialog();
  const router = useRouter();

  // 途中セッションの中断時のパスを判定
  const checkPath = (ideaSession: IdeaSessionType) => {
    if (ideaSession.isAiAnswerGenerated) {
      return "idea-generation"; // アイデア出し画面（回答生成後）
    }

    if (ideaSession.theme) {
      return "idea-generation"; // アイデア出し画面（回答生成前）
    }

    if (ideaSession.isThemeDetermined) {
      return "theme"; // テーマ入力画面
    }

    if (ideaSession.isAiThemeGenerated) {
      return "theme-generation"; // テーマ生成画面
    }

    if (ideaSession.category !== 0) {
      return "select-theme-category"; // テーマカテゴリ選択画面
    }

    return "check-theme"; // テーマ有無選択画面
  };

  // モーダルのYESボタンクリック時の処理
  const handleModalYesClick = (sessionInProgress: IdeaSessionType) => {
    const path = checkPath(sessionInProgress);
    router.push(`/${sessionInProgress.uuid}/${path}`);
  };

  const handleStartClick = async () => {
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
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <Button
          onClick={handleStartClick}
          color="pink"
          size="large"
          flicker="no-flicker"
        >
          <div>
            アイデア出し<span>スタート</span>
          </div>
        </Button>
        <LinkButton
          href="#"
          color="light-blue"
          size="large"
          flicker="no-flicker"
        >
          <div>
            アイデア
            <span>ストックメモ</span>
          </div>
        </LinkButton>
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
      </div>
    </main>
  );
}
