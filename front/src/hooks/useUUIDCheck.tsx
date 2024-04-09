"use client";

/**
 *  UUIDがユーザーの所有するものがチェックするカスタムフック
 *
 *  正当なUUIDが取得できなければ404エラーページを表示
 */
import { IdeaSessionType } from "@/types";
import { notFound, usePathname } from "next/navigation";
import { useEffect } from "react";

export const useUUIDCheck = ({
  ideaSession,
}: {
  ideaSession: IdeaSessionType | null;
}) => {
  // ideaSessionからUUIDを取得
  const uuid = ideaSession?.uuid ?? "";
  // URLからUUIDを取得
  const uuidFromPath = usePathname().split("/")[1];

  useEffect(() => {
    // URLに含まれるUUIDがログインユーザーのものと一致するかチェック
    if (!uuid || !uuidFromPath || uuid !== uuidFromPath) {
      notFound();
    }
  }, [uuid, uuidFromPath]);

  return { uuid };
};
