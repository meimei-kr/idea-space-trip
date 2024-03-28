"use server";

import { AiGeneratedAnswerType } from "@/types";
import { Deserializer } from "jsonapi-serializer";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
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
    if (response.status === 401) {
      throw new Error("Unauthorized");
    }
    const serializedData = await response.json();
    if (!response.ok) {
      throw new Error(`AIによる回答生成に失敗しました: ${serializedData}`);
    }
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      redirect("/auth/signin");
    }
    throw new Error(`予期せぬエラーが発生しました: ${error}`);
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
