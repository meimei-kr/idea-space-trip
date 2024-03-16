"use client";

import styles from "@/app/presentation/GenerateIdeas/GenerateIdeasPresentation.module.scss";
import BackButton from "@/components/elements/BackButton/BackButton";
import Description from "@/components/elements/Description/Description";
import SectionTitle from "@/components/elements/SectionTitle/SectionTitle";
import Textbox from "@/components/elements/Textbox/Textbox";
import {
  BorderMagic,
  LitUpBorders,
  LitUpBordersLg,
} from "@/components/ui/tailwind-buttons";
import { SESSION_LAST_INDEX } from "@/constants/constants";
import { useUUIDCheck } from "@/hooks/useUUIDCheck";
import { MyIdeaState, submitAiAnswer, submitMyIdea } from "@/lib/actions";
import { createAiGeneratedAnswers } from "@/lib/ai-generated-answers";
import { updateIdeaSession } from "@/lib/idea-sessions";
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
import Astronaut from "public/images/astronaut.svg";
import Blob from "public/images/white-blob.svg";
import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { IoChevronForward } from "react-icons/io5";

export default function GenerateIdeasPresentation({
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
  const [isSentAPIRequest, setIsSentAPIRequest] = useState(false); // APIリクエストを送信中かどうか

  const router = useRouter();
  const { uuid, statusCode } = useUUIDCheck({ ideaSession });
  const session = useSession();
  const scrollTopRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLFormElement>(null);

  // 回答が未生成であれば、回答を生成する
  useEffect(() => {
    let perspectivesStr: string = "";
    selectedPerspectives.forEach((perspective) => {
      perspectivesStr += perspective.name + "、";
    });
    const createAiAnswers = async (
      uuid: string,
      perspectives: string,
      theme: string,
    ) => await createAiGeneratedAnswers(uuid, perspectives, theme);
    if (ideaSession && !aiGeneratedAnswers && !isSentAPIRequest) {
      createAiAnswers(ideaSession.uuid!, perspectivesStr, ideaSession.theme!);
      setIsSentAPIRequest(true);
    }
  }, []);

  // ユーザーIDをもとにActionCableチャネルをサブスクライブ
  const userId = ideaSession?.userId;
  useEffect(() => {
    const accessToken = session.data?.user.accessToken ?? "";
    const cable = createConsumer(
      `${process.env.NEXT_PUBLIC_WEBSOCKET_PROTOCOL}://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/cable?token=${encodeURIComponent(accessToken)}`,
    );
    const subscription = cable.subscriptions.create(
      { channel: "AiIdeaChannel", user_id: userId },
      {
        received: (data) => {
          const handleReceivedData = async () => {
            if (data.error) {
              console.error(data.error);
              return;
            }
            setAiGeneratedAnswers(data.body);
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

  // フォーム送信処理
  const initialMyIdeaState: MyIdeaState = {
    errors: {},
  };
  const [myIdeaState, myIdeaStateDispatch] = useFormState(
    submitMyIdea,
    initialMyIdeaState,
  );

  // フォーム送信後エラーがなければ、フォームクリア
  useEffect(() => {
    if (!myIdeaState?.errors?.idea) {
      ref?.current?.reset();
    }
  }, [myIdeaState]);

  // スクロールを一番上に戻す
  const scrollToTop = () => {
    scrollTopRef?.current?.scrollIntoView();
  };

  // AIの回答を表示
  const handleShowAnswers = () => {
    setIsOpenAIAnswer(true);
  };

  // 別のヒントを表示
  const handleShowOtherHint = () => {
    setIsOpenAIAnswer(false);
    setAnswerIndex((prev) => prev + 1);
  };

  // 次の考え方に進む
  const handleShowNextPerspective = () => {
    setIsOpenAIAnswer(false);
    setAnswerIndex((prev) => prev + 1);
    setPerspectiveIndex((prev) => prev + 1);
    scrollToTop();
  };

  // セッションを終了する
  useEffect(() => {
    router.prefetch(`/${uuid}/end-session`);
  }, [router, uuid]);
  const handleEndSession = async () => {
    await updateIdeaSession(uuid, { isFinished: true });
    router.push(`/${uuid}/end-session`);
  };

  // 戻るボタンの処理
  const handleBack = () => {
    if (ideaSession?.isThemeDetermined) {
      router.push(`/${uuid}/input-theme`);
    } else {
      router.push(`/${uuid}/generate-theme`);
    }
  };

  // エラーがある場合はエラーページを表示
  if (statusCode >= 400) {
    return <Error statusCode={statusCode} />;
  }
  return (
    <main className={styles.wrapper}>
      <div className={styles.container} ref={scrollTopRef}>
        <div className={styles.content}>
          <Description>
            アイデアの良し悪しは考えず、
            <br />
            思いついたことをどんどん書いていこう！
          </Description>
          <div className={styles.count}>
            <span>{count}個 </span>アイデアが浮かんだよ！
          </div>
          <div className={styles.theme}>
            <SectionTitle>テーマ</SectionTitle>
            <div className={styles.themeContentConatiner}>
              <div className={styles.themeContent}>
                <div>{ideaSession?.theme}</div>
              </div>
            </div>
          </div>
          <div className={styles.perspective}>
            <SectionTitle>考え方</SectionTitle>
            <div className={styles.perspectiveContentContainer}>
              <div className={styles.perspectiveContent}>
                <div>
                  <div>
                    <div className={styles.perspectiveMain}>
                      <span>
                        {selectedPerspectives[perspectiveIndex]!.name}
                      </span>
                      してみよう
                    </div>
                    <div className={styles.perspectiveSub}>
                      {selectedPerspectives[perspectiveIndex]!.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ユーザー回答フォーム */}
          <div className={styles.answer}>
            <SectionTitle>回答</SectionTitle>
            <div className={styles.answerContentContainer}>
              <div className={styles.answerContent}>
                <form
                  ref={ref}
                  action={async (formData) => {
                    await myIdeaStateDispatch(formData);
                    setCount((prev) => prev + 1);
                  }}
                  className={styles.form}
                >
                  {myIdeaState?.errors?.idea &&
                    myIdeaState?.errors?.idea.map((error, index) => (
                      <div key={index} id="idea-error" className={styles.error}>
                        {error}
                      </div>
                    ))}
                  <Textbox
                    id="idea"
                    name="idea"
                    ariaDescribedby="idea-error"
                    placeholder="思いついたアイデアを入力してね（255文字以内）"
                  />
                  <input
                    type="hidden"
                    value={selectedPerspectives[perspectiveIndex]!.name}
                    id="perspective"
                    name="perspective"
                  />
                  <input type="hidden" value={uuid} id="uuid" name="uuid" />
                  <SubmitButton />
                </form>
              </div>
            </div>
          </div>

          {aiGeneratedAnswers ? (
            <div className={styles.aiResponse}>
              <div className={styles.hint}>
                <div className={styles.fukidashi}>\ ヒント /</div>
                <Astronaut className={styles.astronaut} />
                <div className={styles.blobContainer}>
                  <div className={styles.blobComment}>
                    <span>{aiGeneratedAnswers[answerIndex]!.hint}</span>を
                    {selectedPerspectives[perspectiveIndex]!.name}
                    してみたらどうかな？
                  </div>
                  <Blob className={styles.blob} />
                </div>
              </div>
              <BorderMagic type="button" onClick={handleShowAnswers}>
                AIの回答を見る
              </BorderMagic>
              {isOpenAIAnswer && (
                <>
                  <div className={styles.aiAnswerContainer}>
                    <form
                      action={async (formData) => {
                        await submitAiAnswer(formData);
                        setCount((prev) => prev + 1);
                      }}
                      className={styles.aiAnswerForm}
                    >
                      <div className={styles.aiAnswer}>
                        {aiGeneratedAnswers[answerIndex]!.answer}
                      </div>
                      <input
                        type="hidden"
                        id="perspective"
                        name="perspective"
                        value={selectedPerspectives[perspectiveIndex]!.name}
                      />
                      <input
                        type="hidden"
                        id="hint"
                        name="hint"
                        value={aiGeneratedAnswers[answerIndex]!.hint}
                      />
                      <input
                        type="hidden"
                        id="answer"
                        name="answer"
                        value={aiGeneratedAnswers[answerIndex]!.answer}
                      />
                      <input type="hidden" id="uuid" name="uuid" value={uuid} />
                      <SubmitButton />
                    </form>
                  </div>
                  {answerIndex % 3 === 2 ? (
                    <>
                      {perspectiveIndex < SESSION_LAST_INDEX ? (
                        <div className={styles.nextButton}>
                          <LitUpBordersLg
                            type="button"
                            onClick={handleShowNextPerspective}
                          >
                            次の考え方に進む
                          </LitUpBordersLg>
                          <IoChevronForward className={styles.nextArrow} />
                        </div>
                      ) : (
                        <LitUpBordersLg
                          type="button"
                          onClick={handleEndSession}
                        >
                          セッションを終了する
                        </LitUpBordersLg>
                      )}
                    </>
                  ) : (
                    <LitUpBordersLg type="button" onClick={handleShowOtherHint}>
                      別のヒントを見る
                    </LitUpBordersLg>
                  )}
                </>
              )}
            </div>
          ) : (
            <div className={styles.loaderContainer}>
              <div className={styles.loader}></div>
              <div className={styles.loaderSentence}>AIも一緒に考え中...</div>
            </div>
          )}
        </div>
      </div>

      <BackButton onClick={handleBack} />
    </main>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <LitUpBorders type="submit" disabled={pending}>
      保存
    </LitUpBorders>
  );
};