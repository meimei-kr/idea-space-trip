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
import { createAiGeneratedAnswers } from "@/lib/ai-generated-answers";
import { updateIdeaSession } from "@/lib/idea-sessions";
import {
  AiGeneratedAnswerType,
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
import { IoChevronForward } from "react-icons/io5";

export default function GenerateIdeasPresentation({
  ideaSession,
  selectedPerspectives,
  answers,
}: {
  ideaSession: IdeaSessionType | null;
  selectedPerspectives: PerspectiveType[];
  answers: AiGeneratedAnswerType[] | null;
}) {
  const [aiGeneratedAnswers, setAiGeneratedAnswers] = useState<
    AiGeneratedAnswerType[] | null
  >(answers); // AIによる回答
  const [answerIndex, setAnswerIndex] = useState(0); // AIの回答配列のインデックス
  const [perspectiveIndex, setPerspectiveIndex] = useState(0); // ３つの観点のうち、現在表示している観点のインデックス
  // const [count, setCount] = useState(0); // 出したアイデアの数
  const [isOpenAIAnswer, setIsOpenAIAnswer] = useState(false); // AIの回答を表示するかどうか

  const router = useRouter();
  const { uuid, statusCode } = useUUIDCheck({ ideaSession });
  const session = useSession();
  const scrollTopRef = useRef<HTMLDivElement>(null);

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
    if (ideaSession && !aiGeneratedAnswers) {
      createAiAnswers(ideaSession.uuid!, perspectivesStr, ideaSession.theme!);
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
          console.log(data);
          const handleReceivedData = async () => {
            if (data.error) {
              alert(data.error);
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
          {/* <div className={styles.count}>
            <span>{count}個 </span>アイデアが浮かんだよ！
          </div> */}
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
          <div className={styles.answer}>
            <SectionTitle>回答</SectionTitle>
            <div className={styles.answerContentContainer}>
              <div className={styles.answerContent}>
                <form action="" className={styles.form}>
                  <Textbox
                    id="idea"
                    name="idea"
                    ariaDescribedby="idea-error"
                    placeholder="思いついたアイデアを入力してね"
                  />
                  <input type="hidden" value={uuid} id="uuid" name="uuid" />
                  <LitUpBorders type="submit">保存</LitUpBorders>
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
                    <div className={styles.aiAnswer}>
                      {aiGeneratedAnswers[answerIndex]!.answer}
                    </div>
                    <LitUpBorders type="button">保存</LitUpBorders>
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
