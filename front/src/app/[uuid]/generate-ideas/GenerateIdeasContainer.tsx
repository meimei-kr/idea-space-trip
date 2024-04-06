"use client";

import {
  COMMEND_MESSAGE_INTERVAL,
  FIRST_COMMEND_MESSAGE_COUNT,
  HEADER_HEIGHT,
} from "@/constants/constants";
import { useUUIDCheck } from "@/hooks/useUUIDCheck";
import { createAiGeneratedAnswers } from "@/lib/ai-generated-answers";
import { updateAIUsageHistory } from "@/lib/ai-usage-history";
import {
  createIdeaSession,
  deleteIdeaSession,
  updateIdeaSession,
} from "@/lib/idea-sessions";
import { generateUUID } from "@/lib/uuid";
import {
  AiGeneratedAnswerType,
  IdeaMemoType,
  IdeaSessionType,
  PerspectiveType,
} from "@/types";
import { createConsumer } from "@rails/actioncable";
import { useSession } from "next-auth/react";
import Error from "next/error";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import GenerateIdeasPresentation from "./GenerateIdeasPresentation";

export default function GenerateIdeasContainer({
  ideaSession,
  selectedPerspectives,
  aiAnswers,
  myIdeas,
}: {
  ideaSession: IdeaSessionType | null;
  selectedPerspectives: PerspectiveType[];
  aiAnswers: AiGeneratedAnswerType[] | null;
  myIdeas: IdeaMemoType[] | null;
}) {
  const [aiGeneratedAnswers, setAiGeneratedAnswers] = useState<
    AiGeneratedAnswerType[] | null
  >(aiAnswers); // AIによる回答
  const [answerIndex, setAnswerIndex] = useState(0); // AIの回答配列のインデックス
  const [perspectiveIndex, setPerspectiveIndex] = useState(0); // ３つの観点のうち、現在表示している観点のインデックス
  const [count, setCount] = useState(myIdeas ? myIdeas.length : 0); // 出したアイデアの数
  const [isOpenAIAnswer, setIsOpenAIAnswer] = useState(false); // AIの回答を表示するかどうか
  const [isAlertOpen, setIsAlertOpen] = useState(false); // アラートを表示するかどうか
  const [hasApiError, setHasApiError] = useState(false); // APIリクエスト失敗時のエラーがあるかどうか

  const router = useRouter();
  const { uuid, statusCode } = useUUIDCheck({ ideaSession });
  const session = useSession();
  const scrollTopRef = useRef<HTMLElement>(null);
  const scrollNextHintRef = useRef<HTMLDivElement>(null);

  // 初回レンダリング時に画面位置を一番上に移動
  useEffect(() => {
    scrollToTop();
  }, []);

  // AIの回答生成APIリクエスト処理
  const fetchAiAnswers = async () => {
    const perspectivesStr = selectedPerspectives.map((p) => p.name).join("、");
    if (ideaSession && !aiGeneratedAnswers) {
      await createAiGeneratedAnswers(
        ideaSession.uuid!,
        perspectivesStr,
        ideaSession.theme!,
      );
    }
  };

  // 回答が未生成であれば、回答を生成する
  useEffect(() => {
    fetchAiAnswers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ユーザーIDをもとにActionCableチャネルをサブスクライブ
  const userId = ideaSession?.userId;
  useEffect(() => {
    const accessToken = session.data?.user.accessToken ?? "";
    const cable = createConsumer(
      `${process.env.NEXT_PUBLIC_WEBSOCKET_PROTOCOL}://${process.env.NEXT_PUBLIC_API_HOST_PORT}/cable?token=${encodeURIComponent(accessToken)}`,
    );
    const subscription = cable.subscriptions.create(
      { channel: "AiIdeaChannel", user_id: userId },
      {
        received: (data) => {
          const handleReceivedData = async () => {
            // 無効な入力だと判断された場合の処理
            if (data.invalid) {
              setIsAlertOpen(true);
              return;
            }
            // 内部エラー発生時の処理
            if (data.error) {
              console.error(data.error);
              setHasApiError(true);
              return;
            }
            setAiGeneratedAnswers(data.body);
            toast("AIからヒントと回答例が届いたよ！", {
              icon: "🚀",
            });
            // AIの回答生成が成功したのでideaSessionのis_ai_answer_generatedをtrueにする
            await updateIdeaSession(uuid, { isAiAnswerGenerated: true });
          };
          handleReceivedData();
        },
      },
    );
    return () => {
      subscription.unsubscribe();
      cable.disconnect();
    };
  }, [userId, uuid, session.data?.user.accessToken]);

  // 出したアイデア数が一定数に達すると、トースト表示
  useEffect(() => {
    if (count === FIRST_COMMEND_MESSAGE_COUNT) {
      toast("アイデア5個達成！", {
        icon: "👏",
      });
    } else if (count !== 0 && count % COMMEND_MESSAGE_INTERVAL === 0) {
      toast(`アイデア${count}個達成！`, {
        icon: "🎉",
      });
    }
  }, [count]);

  // スクロールを一番上に戻す
  const scrollToTop = () => {
    const headerHeight = HEADER_HEIGHT; // ヘッダーの高さをピクセル単位で設定
    if (scrollTopRef.current) {
      const topPos =
        scrollTopRef.current.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;
      window.scrollTo({ top: topPos, behavior: "smooth" });
    }
  };

  // スクロールをヒントの位置に移動
  const scrollToNextHint = () => {
    scrollNextHintRef?.current?.scrollIntoView();
  };

  // AIの回答を表示
  const handleShowAnswers = () => {
    setIsOpenAIAnswer(true);
  };

  // 別のヒントを表示
  const handleShowOtherHint = () => {
    setIsOpenAIAnswer(false);
    setAnswerIndex((prev) => prev + 1);
    scrollToNextHint();
  };

  // 次の考え方に進む
  const handleShowNextPerspective = () => {
    setIsOpenAIAnswer(false);
    setAnswerIndex((prev) => prev + 1);
    setPerspectiveIndex((prev) => prev + 1);
    scrollToTop();
  };

  useEffect(() => {
    router.prefetch(`/${uuid}/end-session`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuid]);

  // アラートでOKをクリック時の処理
  const handleOkClick = async () => {
    setIsAlertOpen(false);

    const retryCount = ideaSession?.aiAnswerRetryCount ?? 0;
    if (retryCount <= 2) {
      const newRetryCount = retryCount + 1;
      await updateIdeaSession(uuid, {
        aiAnswerRetryCount: newRetryCount,
      });
      if (ideaSession?.isAiThemeGenerated) {
        router.push(`/${uuid}/generate-theme`);
        router.refresh();
      } else {
        router.push(`/${uuid}/input-theme`);
      }
    } else {
      // リトライ回数制限に達した場合
      // ai_usage_historiesテーブルの使用回数を1増やす
      await updateAIUsageHistory();
      // idea_sessionsテーブルから当該セッションを削除
      await deleteIdeaSession(uuid);
      // 新しいアイデア出しセッションを開始
      const newUUID = generateUUID();
      await createIdeaSession(newUUID);
      router.push(`/${encodeURIComponent(newUUID)}/check-theme`);
    }
  };

  // APIリクエストエラー時のアラートで再試行をクリック時の処理
  const handleRetryClick = () => {
    setHasApiError(false);
    fetchAiAnswers();
  };

  // エラーがある場合はエラーページを表示
  if (statusCode >= 400) {
    return <Error statusCode={statusCode} />;
  }
  return (
    <GenerateIdeasPresentation
      ideaSession={ideaSession}
      selectedPerspectives={selectedPerspectives}
      aiGeneratedAnswers={aiGeneratedAnswers}
      answerIndex={answerIndex}
      perspectiveIndex={perspectiveIndex}
      count={count}
      setCount={setCount}
      isOpenAIAnswer={isOpenAIAnswer}
      handleShowAnswers={handleShowAnswers}
      handleShowNextPerspective={handleShowNextPerspective}
      handleShowOtherHint={handleShowOtherHint}
      handleOkClick={handleOkClick}
      handleRetryClick={handleRetryClick}
      isAlertOpen={isAlertOpen}
      hasApiError={hasApiError}
      scrollTopRef={scrollTopRef}
      scrollNextHintRef={scrollNextHintRef}
      uuid={uuid}
    />
  );
}
