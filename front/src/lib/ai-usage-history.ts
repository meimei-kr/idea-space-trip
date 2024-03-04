"use server";

import { authOptions } from "@/lib/options";
import { Deserializer } from "jsonapi-serializer";
import { getServerSession } from "next-auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// OpenAI APIの使用回数を取得
export async function getAIUsageHistory() {
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
