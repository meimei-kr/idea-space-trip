"use server";

import { AiGeneratedThemeType, IdeaSessionType } from "@/types";
import { Deserializer } from "jsonapi-serializer";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
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
    if (response.status === 401) {
      throw new Error("Unauthorized");
    }
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
    if (error instanceof Error && error.message === "Unauthorized") {
      redirect("/auth/signin");
    }
    throw new Error(`予期せぬエラーが発生しました: ${error}`);
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
    if (response.status === 401) {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      redirect("/auth/signin");
    }
    throw new Error(`予期せぬエラーが発生しました: ${error}`);
  }
}
