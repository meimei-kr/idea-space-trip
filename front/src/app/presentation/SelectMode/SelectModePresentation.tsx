"use client";

import styles from "@/app/presentation/SelectMode/SelectModePresentation.module.scss";
import Button from "@/components/elements/Button/Button";
import LinkButton from "@/components/elements/LinkButton/LinkButton";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
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
import Link from "next/link";
import { useRouter } from "next/navigation";

export function SelectModePresentation() {
  const { toast } = useToast();

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
            altText="アイデアメモ"
            className="text-white bg-slate-950 hover:bg-slate-800 z-50 h-16 sm:5"
          >
            <Link href="/memos">アイデアメモ</Link>
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
          href="/idea-memos"
          color="light-blue"
          size="large"
          flicker="no-flicker"
        >
          <div>アイデアメモ</div>
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
