"use server";

import { IdeaSessionType } from "@/types";
import { Deserializer } from "jsonapi-serializer";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./options";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// 途中のアイデアセッションを取得
export async function getIdeaSessionInProgress(): Promise<IdeaSessionType | null> {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/idea_sessions/show_in_progress`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
        cache: "no-store",
      },
    );
    if (response.status === 401) {
      throw new Error("Unauthorized");
    }
    const serializedData = await response.json();
    if (serializedData === null) {
      return null;
    }
    // JSON APIのデータをデシリアライズ
    const deserializedData = await new Deserializer({
      keyForAttribute: "camelCase",
    }).deserialize(serializedData);
    return deserializedData;
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      redirect("/auth/signin");
    }
    throw new Error(`予期せぬエラーが発生しました: ${error}`);
  }
}

// アイデアセッションを作成
export async function createIdeaSession(
  uuid: string,
): Promise<IdeaSessionType> {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(`${BASE_URL}/api/v1/idea_sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
      body: JSON.stringify({
        idea_session: {
          uuid,
        },
      }),
    });
    if (response.status === 401) {
      throw new Error("Unauthorized");
    }
    const serializedData = await response.json();
    if (!response.ok) {
      throw new Error(`データ作成に失敗しました: ${serializedData}`);
    }
    // JSON APIのデータをデシリアライズ
    const deserializedData = await new Deserializer({
      keyForAttribute: "camelCase",
    }).deserialize(serializedData);
    return deserializedData;
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      redirect("/auth/signin");
    }
    throw new Error(`予期せぬエラーが発生しました: ${error}`);
  }
}

// アイデアセッションを削除
export async function deleteIdeaSession(uuid: string) {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(`${BASE_URL}/api/v1/idea_sessions/${uuid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    });
    if (response.status === 401) {
      throw new Error("Unauthorized");
    }
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(`データ削除に失敗しました: ${responseData}`);
    }
    return responseData;
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      redirect("/auth/signin");
    }
    throw new Error(`予期せぬエラーが発生しました: ${error}`);
  }
}

// アイデアセッションを更新
export async function updateIdeaSession(
  uuid: string,
  data: IdeaSessionType,
): Promise<IdeaSessionType> {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(`${BASE_URL}/api/v1/idea_sessions/${uuid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
      body: JSON.stringify({
        idea_session: { ...data },
      }),
    });
    if (response.status === 401) {
      throw new Error("Unauthorized");
    }
    const serializedData = await response.json();
    if (!response.ok) {
      throw new Error(`データ更新に失敗しました: ${serializedData}`);
    }
    // JSON APIのデータをデシリアライズ
    const deserializedData = await new Deserializer({
      keyForAttribute: "camelCase",
    }).deserialize(serializedData);
    return deserializedData;
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      redirect("/auth/signin");
    }
    throw new Error(`予期せぬエラーが発生しました: ${error}`);
  }
}

// 最新２つのアイデアセッションとそれに紐づくアイデアメモを取得
export async function getLatestTwoIdeaSessionsWithMemos(): Promise<
  IdeaSessionType[]
> {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/idea_sessions/show_latest_two_with_memos`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
        cache: "no-store",
      },
    );
    if (response.status === 401) {
      throw new Error("Unauthorized");
    }
    const serializedData = await response.json();
    if (!response.ok) {
      throw new Error(`データ取得に失敗しました: ${serializedData}`);
    }
    // JSON APIのデータをデシリアライズ
    const deserializedData = await new Deserializer({
      keyForAttribute: "camelCase",
    }).deserialize(serializedData);

    return deserializedData;
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      redirect("/auth/signin");
    }
    throw new Error(`予期せぬエラーが発生しました: ${error}`);
  }
}
