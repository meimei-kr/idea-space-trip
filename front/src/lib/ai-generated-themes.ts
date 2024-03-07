"use server";

import { IdeaSessionType } from "@/types";
import { Deserializer } from "jsonapi-serializer";
import { getServerSession } from "next-auth";
import { authOptions } from "./options";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * AIによるテーマ生成案を作成
 */
export async function createAIGeneratedThemes(
  uuid: string,
  data: IdeaSessionType,
) {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/idea_sessions/${uuid}/ai_generated_themes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
        body: JSON.stringify({
          idea_session: {
            ...data,
          },
        }),
      },
    );
    if (!response.ok) {
      throw new Error(`AIによるテーマ案生成に失敗しました: ${response.json()}`);
    }
    const serializedData = await response.json();
    // JSON APIのデータをデシリアライズ
    const deserializedData = await new Deserializer({
      keyForAttribute: "camelCase",
    }).deserialize(serializedData);
    return deserializedData;
  } catch (error) {
    console.error(error);
    throw new Error(`データ作成に失敗しました: ${error}`);
  }
}

/**
 * AIによるテーマ生成案を取得
 */
export async function getAIGeneratedThemes(uuid: string) {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/idea_sessions/${uuid}/ai_generated_themes`,
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
    console.error(error);
    throw new Error(`データ取得に失敗しました: ${error}`);
  }
}
