"use server";

import { AiGeneratedAnswerType } from "@/types";
import { Deserializer } from "jsonapi-serializer";
import { getServerSession } from "next-auth";
import { authOptions } from "./options";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * AIによる回答を取得
 *
 * @param ideaSession: IdeaSessionType
 * @returns aiGeneratedAnswers: AiGeneratedAnswerType[]
 */
export async function getAiGeneratedAnswers(
  uuid: string,
): Promise<AiGeneratedAnswerType[] | null> {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/idea_sessions/${uuid}/ai_generated_answers`,
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
    if (!response.ok) {
      throw new Error(`AIによる回答取得に失敗しました: ${serializedData}`);
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
    console.error(error);
    throw new Error(`データ取得に失敗しました: ${error}`);
  }
}

/**
 * AIによる回答を作成
 *
 * @param uuid: string
 * @param perspectives: string
 * @param theme: string
 * @returns aiGeneratedAnswers: AiGeneratedAnswerType[]
 */
export async function createAiGeneratedAnswers(
  uuid: string,
  perspectives: string,
  theme: string,
) {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/idea_sessions/${uuid}/ai_generated_answers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
        body: JSON.stringify({
          user_input: {
            perspectives,
            theme,
          },
        }),
      },
    );
    const serializedData = await response.json();
    if (!response.ok) {
      throw new Error(`AIによる回答生成に失敗しました: ${serializedData}`);
    }
  } catch (error) {
    console.error(error);
    throw new Error(`データ作成に失敗しました: ${error}`);
  }
}

/**
 * AIによる回答を削除
 *
 * @param uuid: string
 */
export async function deleteAiGeneratedAnswers(uuid: string) {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/idea_sessions/${uuid}/ai_generated_answers`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      },
    );
    const serializedData = await response.json();
    if (!response.ok) {
      throw new Error(`AIによる回答削除に失敗しました: ${serializedData}`);
    }
  } catch (error) {
    console.error(error);
    throw new Error(`データ削除に失敗しました: ${error}`);
  }
}
