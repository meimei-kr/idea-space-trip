"use client";

/**
 *  UUIDがユーザーの所有するものがチェックするカスタムフック
 *
 *  正当なUUIDが取得できなければエラーコードをセットする
 */
import { IdeaSessionType } from "@/types";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useUUIDCheck = ({
  ideaSession,
}: {
  ideaSession: IdeaSessionType | null;
}) => {
  const router = useRouter();
  const [statusCode, setStatusCode] = useState<number>(200);

  // ideaSessionからUUIDを取得
  const uuid = ideaSession?.uuid ?? "";
  // URLからUUIDを取得
  const uuidFromPath = usePathname().split("/")[1];

  useEffect(() => {
    // セッションは開始されており、ideaSessionは必ず取得できる想定なので
    // nullの場合は、500エラーを返す
    if (ideaSession === null) {
      setStatusCode(500);
      return;
    }

    // URLに含まれるUUIDがログインユーザーのものと一致するかチェック
    if (!uuid || !uuidFromPath || uuid !== uuidFromPath) {
      setStatusCode(404);
    } else {
      setStatusCode(200);
      // 遷移先パスをprefetch
      router.prefetch(`/select-mode`);
      router.prefetch(`/${uuid}/input-theme`);
      router.prefetch(`/${uuid}/select-theme-category`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { uuid, statusCode };
};
