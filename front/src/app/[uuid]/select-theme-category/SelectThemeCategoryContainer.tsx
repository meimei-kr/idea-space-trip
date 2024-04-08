"use client";

import SelectThemeCategoryPresentation from "@/app/[uuid]/select-theme-category/SelectThemeCategoryPresentation";
import { useUUIDCheck } from "@/hooks/useUUIDCheck";
import { IdeaSessionType } from "@/types";
import Error from "next/error";

export default function SelectThemeCategoryContainer({
  ideaSession,
}: {
  ideaSession: IdeaSessionType | null;
}) {
  const { uuid, statusCode } = useUUIDCheck({ ideaSession });

  // エラーがある場合はエラーページを表示
  if (statusCode >= 400) {
    return <Error statusCode={statusCode} />;
  }

  return (
    <SelectThemeCategoryPresentation uuid={uuid} ideaSession={ideaSession} />
  );
}
