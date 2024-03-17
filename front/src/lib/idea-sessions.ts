"use server";

import { IdeaSessionType } from "@/types";
import { Deserializer } from "jsonapi-serializer";
import { getServerSession } from "next-auth";
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
    throw new Error(`データ取得に失敗しました: ${error}`);
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
    throw new Error(`データ作成に失敗しました: ${error}`);
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
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(`データ削除に失敗しました: ${responseData}`);
    }
    return responseData;
  } catch (error) {
    throw new Error(`データ削除に失敗しました: ${error}`);
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
    throw new Error(`データ更新に失敗しました: ${error}`);
  }
}
