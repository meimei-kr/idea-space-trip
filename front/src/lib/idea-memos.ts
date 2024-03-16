import { IdeaMemoType } from "@/types";
import { Deserializer } from "jsonapi-serializer";
import { getServerSession } from "next-auth";
import { authOptions } from "./options";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * アイデアメモを作成する
 *
 * @param uuid
 * @param memo
 * @returns Promise<IdeaMemoType>
 */
export async function createIdeaMemos(
  uuid: string,
  memo: IdeaMemoType,
): Promise<IdeaMemoType> {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/idea_sessions/${uuid}/idea_memos`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
        body: JSON.stringify({ idea_memo: { ...memo } }),
      },
    );
    if (!response.ok) {
      throw new Error(`アイデアの保存に失敗しました: ${response.json()}`);
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
 * 現在のアイデアセションに紐づくアイデアメモを取得する
 */
export async function getCurrentIdeaMemos(
  uuid: string,
): Promise<IdeaMemoType[] | null> {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/idea_sessions/${uuid}/idea_memos/all_in_session`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error(`アイデアの取得に失敗しました: ${response.json()}`);
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
    console.error(error);
    throw new Error(`データ取得に失敗しました: ${error}`);
  }
}
