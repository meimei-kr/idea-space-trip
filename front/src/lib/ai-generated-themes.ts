"use server";

import { AiGeneratedThemeType, IdeaSessionType } from "@/types";
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
): Promise<AiGeneratedThemeType | null> {
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
            theme_category: data.themeCategory,
            theme_question: data.themeQuestion,
            theme_answer: data.themeAnswer,
          },
        }),
      },
    );
    const serializedData = await response.json();
    if (!response.ok) {
      throw new Error(`AIによるテーマ案生成に失敗しました: ${serializedData}`);
    }
    if (serializedData === null) {
      return null;
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

/**
 * AIによるテーマ生成案を取得
 */
export async function getAIGeneratedThemes(
  uuid: string,
): Promise<AiGeneratedThemeType[] | null> {
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
    throw new Error(`データ取得に失敗しました: ${error}`);
  }
}

/**
 * AIによるテーマ生成案を削除
 */
export async function deleteAIGeneratedThemes(uuid: string): Promise<void> {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/idea_sessions/${uuid}/ai_generated_themes`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error(`AIによるテーマ案削除に失敗しました: ${response.status}`);
    }
  } catch (error) {
    throw new Error(`データ削除に失敗しました: ${error}`);
  }
}
