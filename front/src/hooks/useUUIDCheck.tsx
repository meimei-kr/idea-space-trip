"use client";

/**
 *  UUIDがユーザーの所有するものがチェックするカスタムフック
 *
 *  正当なUUIDが取得できなければ404エラーページを表示
 */
import { IdeaSessionType } from "@/types";
import { notFound, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export const useUUIDCheck = ({
  ideaSession,
}: {
  ideaSession: IdeaSessionType | null;
}) => {
  const router = useRouter();

  // ideaSessionからUUIDを取得
  const uuid = ideaSession?.uuid ?? "";
  // URLからUUIDを取得
  const uuidFromPath = usePathname().split("/")[1];

  useEffect(() => {
    // URLに含まれるUUIDがログインユーザーのものと一致するかチェック
    if (!uuid || !uuidFromPath || uuid !== uuidFromPath) {
      notFound();
    } else {
      // 遷移先パスをprefetch
      router.prefetch(`/select-mode`);
      router.prefetch(`/${uuid}/input-theme`);
      router.prefetch(`/${uuid}/select-theme-category`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { uuid };
};
