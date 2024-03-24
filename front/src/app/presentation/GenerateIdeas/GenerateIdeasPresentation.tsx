"use client";

import styles from "@/app/presentation/GenerateIdeas/GenerateIdeasPresentation.module.scss";
import Description from "@/components/elements/Description/Description";
import SectionTitle from "@/components/elements/SectionTitle/SectionTitle";
import Textbox from "@/components/elements/Textbox/Textbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import {
  BorderMagic,
  LitUpBorders,
  LitUpBordersLg,
} from "@/components/ui/tailwind-buttons";
import { SESSION_LAST_INDEX } from "@/constants/constants";
import { useUUIDCheck } from "@/hooks/useUUIDCheck";
import { MyIdeaState, submitAiAnswer, submitMyIdea } from "@/lib/actions";
import {
  createAiGeneratedAnswers,
  deleteAiGeneratedAnswers,
} from "@/lib/ai-generated-answers";
import { deleteAIGeneratedThemes } from "@/lib/ai-generated-themes";
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
import { AlertCircle } from "lucide-react";
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
  const [isAlertOpen, setIsAlertOpen] = useState(false); // アラートを表示するかどうか

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
              if (process.env.NEXT_PUBLIC_API_HOST === "localhost") {
                console.error(data.error);
                return;
              }
              return <Error statusCode={500} />;
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
  const handleFormClear = () => {
    if (!myIdeaState?.errors?.idea) {
      ref?.current?.reset();
    }
  };

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
    await Promise.all([
      // idea_sessionsテーブルのis_finishedをtrueにする
      updateIdeaSession(uuid, { isFinished: true }),
      // ai_generated_themes と ai_generated_answersテーブルのレコードを削除
      deleteAIGeneratedThemes(uuid),
      deleteAiGeneratedAnswers(uuid),
      // ai_usage_historiesテーブル の countを更新
      updateAIUsageHistory(),
    ]);

    router.push(`/${uuid}/end-session`);
    router.refresh();
  };

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
                    handleFormClear();
                    setCount((prev) => prev + 1);
                  }}
                  className={styles.form}
                >
                  {myIdeaState?.errors?.idea &&
                    myIdeaState?.errors?.idea.map((error, index) => (
                      <Alert
                        className="mb-1"
                        variant="destructive"
                        id="idea-error"
                        key={index}
                      >
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
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
              {!isOpenAIAnswer && (
                <BorderMagic type="button" onClick={handleShowAnswers}>
                  AIの回答を見る
                </BorderMagic>
              )}
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

        {/* 無効な入力だと判断された場合のアラート */}
        <AlertDialog
          open={isAlertOpen}
          aria-labelledby="responsive-dialog-title"
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogDescription>
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
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col sm:flex-row gap-4 sm:gap-0">
              <AlertDialogAction onClick={handleOkClick}>OK</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
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
