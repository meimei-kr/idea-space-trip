"use client";

import { LitUpBordersLg } from "@/components/ui/tailwind-buttons";
import { SESSION_LAST_INDEX } from "@/constants/constants";
import EndSessionForm from "@/features/generate-theme/components/EndSessionForm/EndSessionForm";
import NextPersPectiveButton from "@/features/generate-theme/components/NextPerspectiveButton/NextPerspectiveButton";

export default function NextOperationSection({
  answerIndex,
  perspectiveIndex,
  handleShowNextPerspective,
  handleShowOtherHint,
  uuid,
}: {
  answerIndex: number;
  perspectiveIndex: number;
  handleShowNextPerspective: () => void;
  handleShowOtherHint: () => void;
  uuid: string;
}) {
  return (
    <>
      {answerIndex % 3 === 2 ? (
        <>
          {perspectiveIndex < SESSION_LAST_INDEX ? (
            <NextPersPectiveButton>
              <LitUpBordersLg type="button" onClick={handleShowNextPerspective}>
                次の考え方に進む
              </LitUpBordersLg>
            </NextPersPectiveButton>
          ) : (
            <EndSessionForm uuid={uuid} />
          )}
        </>
      ) : (
        <LitUpBordersLg type="button" onClick={handleShowOtherHint}>
          別のヒントを見る
        </LitUpBordersLg>
      )}
    </>
  );
}
