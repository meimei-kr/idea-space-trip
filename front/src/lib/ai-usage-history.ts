"use server";

import { authOptions } from "@/lib/options";
import { AiUsageHistoryType } from "@/types";
import { Deserializer } from "jsonapi-serializer";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * OpenAI APIの使用回数を取得
 */
export async function getAIUsageHistory(): Promise<AiUsageHistoryType | null> {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(`${BASE_URL}/api/v1/ai_usage_history`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
      cache: "no-store",
    });
    if (response.status === 401) {
      throw new Error("Unauthorized");
    }
    if (!response.ok) {
      const errorResponse = await response.json();
      const errorMessage = errorResponse.error;
      throw new Error(`データ取得に失敗しました: ${errorMessage}`);
    }
    const serializedData = await response.json();
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
 * OpenAI APIの使用回数を更新
 */
export async function updateAIUsageHistory(): Promise<AiUsageHistoryType> {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(`${BASE_URL}/api/v1/ai_usage_history`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    });
    if (response.status === 401) {
      throw new Error("Unauthorized");
    }
    if (!response.ok) {
      const errorResponse = await response.json();
      const errorMessage = errorResponse.error;
      throw new Error(`データ更新に失敗しました: ${errorMessage}`);
    }
    const serializedData = await response.json();
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
