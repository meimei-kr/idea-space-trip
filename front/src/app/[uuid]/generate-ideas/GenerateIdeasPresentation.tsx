"use client";

import styles from "@/app/[uuid]/generate-ideas/GenerateIdeas.module.scss";
import AlertModal from "@/components/elements/AlertModal/AlertModal";
import Description from "@/components/elements/Description/Description";
import { BorderMagic } from "@/components/ui/tailwind-buttons";
import * as GenerateIdeas from "@/features/generate-theme/components";
import MyIdeaForm from "@/features/generate-theme/components/MyIdeaForm/MyIdeaForm";
import {
  AiGeneratedAnswerType,
  IdeaSessionType,
  PerspectiveType,
} from "@/types";

export default function GenerateIdeasPresentation({
  ideaSession,
  selectedPerspectives,
  aiGeneratedAnswers,
  answerIndex,
  perspectiveIndex,
  count,
  setCount,
  isOpenAIAnswer,
  handleShowAnswers,
  handleShowNextPerspective,
  handleShowOtherHint,
  handleOkClick,
  handleRetryClick,
  isAlertOpen,
  hasApiError,
  scrollTopRef,
  scrollNextHintRef,
  uuid,
}: {
  ideaSession: IdeaSessionType | null;
  selectedPerspectives: PerspectiveType[];
  aiGeneratedAnswers: AiGeneratedAnswerType[] | null;
  answerIndex: number;
  perspectiveIndex: number;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  isOpenAIAnswer: boolean;
  handleShowAnswers: () => void;
  handleShowNextPerspective: () => void;
  handleShowOtherHint: () => void;
  handleOkClick: () => Promise<void>;
  handleRetryClick: () => void;
  isAlertOpen: boolean;
  hasApiError: boolean;
  scrollTopRef: React.RefObject<HTMLElement>;
  scrollNextHintRef: React.RefObject<HTMLDivElement>;
  uuid: string;
}) {
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
