"use client";

import AlertModal from "@/components/elements/AlertModal/AlertModal";
import Description from "@/components/elements/Description/Description";
import { BorderMagic } from "@/components/ui/tailwind-buttons";
import {
  COMMEND_MESSAGE_INTERVAL,
  FIRST_COMMEND_MESSAGE_COUNT,
  HEADER_HEIGHT,
} from "@/constants/constants";
import * as GenerateIdeas from "@/features/generate-ideas/components";
import styles from "@/features/generate-ideas/components/Content/Content.module.scss";
import MyIdeaForm from "@/features/generate-ideas/components/MyIdeaForm/MyIdeaForm";
import { useUUIDCheck } from "@/hooks/useUUIDCheck";
import { createAiGeneratedAnswers } from "@/lib/ai-generated-answers";
import { updateAIUsageHistory } from "@/lib/ai-usage-history";
import {
  createIdeaSession,
  deleteIdeaSession,
  updateIdeaSession,
} from "@/lib/idea-sessions";
import { generateUUID } from "@/lib/uuid";
import type { IdeaMemoType, IdeaSessionType, PerspectiveType } from "@/types";
import { AiGeneratedAnswerType } from "@/types";
import { createConsumer } from "@rails/actioncable";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function Content({
  ideaSession,
  aiAnswers,
  myIdeas,
  selectedPerspectives,
}: {
  ideaSession: IdeaSessionType | null;
  aiAnswers: AiGeneratedAnswerType[] | null;
  myIdeas: IdeaMemoType[] | null;
  selectedPerspectives: PerspectiveType[];
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
  const { uuid } = useUUIDCheck({ ideaSession });
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

  return (
    <main className={styles.wrapper} ref={scrollTopRef}>
      <GenerateIdeas.FixedCounter count={count} />
      <div className={styles.container}>
        <div className={styles.content}>
          <Description>
            アイデアの良し悪しは考えず、
            <br />
            思いついたことをどんどん書いていこう！
          </Description>
          <GenerateIdeas.Counter count={count} />
          <GenerateIdeas.ThemeSection theme={ideaSession?.theme} />
          <GenerateIdeas.PerspectiveSection
            selectedPerspectives={selectedPerspectives}
            perspectiveIndex={perspectiveIndex}
          />
          <GenerateIdeas.MyIdeaSection scrollNextHintRef={scrollNextHintRef}>
            <MyIdeaForm
              setCount={setCount}
              uuid={uuid}
              selectedPerspectives={selectedPerspectives}
              perspectiveIndex={perspectiveIndex}
            />
          </GenerateIdeas.MyIdeaSection>

          {aiGeneratedAnswers ? (
            // AI回答生成済みの場合
            <div className={styles.aiResponse}>
              <GenerateIdeas.HintSection
                aiGeneratedAnswers={aiGeneratedAnswers}
                answerIndex={answerIndex}
                selectedPerspectives={selectedPerspectives}
                perspectiveIndex={perspectiveIndex}
              />
              {!isOpenAIAnswer ? (
                <BorderMagic type="button" onClick={handleShowAnswers}>
                  AIの回答を見る
                </BorderMagic>
              ) : (
                <>
                  <GenerateIdeas.AnswerSection>
                    <GenerateIdeas.AiAnswerForm
                      aiGeneratedAnswers={aiGeneratedAnswers}
                      answerIndex={answerIndex}
                      selectedPerspectives={selectedPerspectives}
                      perspectiveIndex={perspectiveIndex}
                      setCount={setCount}
                      uuid={uuid}
                    />
                  </GenerateIdeas.AnswerSection>
                  <GenerateIdeas.NextOperationSection
                    answerIndex={answerIndex}
                    perspectiveIndex={perspectiveIndex}
                    handleShowNextPerspective={handleShowNextPerspective}
                    handleShowOtherHint={handleShowOtherHint}
                    uuid={uuid}
                  />
                </>
              )}
            </div>
          ) : (
            // AI回答生成中の場合
            <GenerateIdeas.AiLoadingSection />
          )}
        </div>

        {/* 無効な入力だと判断された場合のアラート */}
        <AlertModal
          isOpen={isAlertOpen}
          onClick={handleOkClick}
          actionDisplay="OK"
        >
          {(ideaSession?.aiAnswerRetryCount ?? 0) <= 2 ? (
            <>
              無効なテーマだと判断されたよ。
              <br />
              テーマを変えてもう一度試してみてね。
            </>
          ) : (
            <>
              無効な入力が複数回続けて検知されたよ。
              <br />
              新しいセッションを作成するので、もう一度やってみてね。
            </>
          )}
        </AlertModal>

        {/* APIリクエストエラー時のアラート */}
        <AlertModal
          isOpen={hasApiError}
          onClick={handleRetryClick}
          actionDisplay="再試行"
        >
          ごめんね、AIの回答生成失敗です。再試行してみてね。
        </AlertModal>
      </div>
    </main>
  );
}
