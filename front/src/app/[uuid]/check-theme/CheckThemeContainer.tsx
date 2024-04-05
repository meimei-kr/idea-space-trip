"use client";

import { useUUIDCheck } from "@/hooks/useUUIDCheck";
import { IdeaSessionType } from "@/types";
import Error from "next/error";
import CheckThemePresentation from "./CheckThemePresentation";

export default function CheckThemeContainer({
  ideaSession,
}: {
  ideaSession: IdeaSessionType | null;
}) {
  const { uuid, statusCode } = useUUIDCheck({ ideaSession });

  // エラーがある場合はエラーページを表示
  if (statusCode >= 400) {
    return <Error statusCode={statusCode} />;
  }

  return <CheckThemePresentation uuid={uuid} />;
}
