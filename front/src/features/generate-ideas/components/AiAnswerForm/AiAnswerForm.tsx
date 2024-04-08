"use client";

import { LitUpBorders } from "@/components/ui/tailwind-buttons";
import styles from "@/features/generate-ideas/components/AiAnswerForm/AiAnswerForm.module.scss";
import { submitAiAnswer } from "@/lib/actions";
import { AiGeneratedAnswerType, PerspectiveType } from "@/types";
import { useFormStatus } from "react-dom";

export default function AiAnswerForm({
  aiGeneratedAnswers,
  answerIndex,
  selectedPerspectives,
  perspectiveIndex,
  setCount,
  uuid,
}: {
  aiGeneratedAnswers: AiGeneratedAnswerType[];
  answerIndex: number;
  selectedPerspectives: PerspectiveType[];
  perspectiveIndex: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  uuid: string;
}) {
  return (
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
