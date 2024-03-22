"use server";

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
    const serializedData = await response.json();
    if (!response.ok) {
      throw new Error(`アイデアの保存に失敗しました: ${serializedData}`);
    }
    // JSON APIのデータをデシリアライズ
    const deserializedData = await new Deserializer({
      keyForAttribute: "camelCase",
    }).deserialize(serializedData);
    return deserializedData;
  } catch (error) {
    throw new Error(`予期せぬエラーが発生しました: ${error}`);
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
    throw new Error(`予期せぬエラーが発生しました: ${error}`);
  }
}

/**
 * 今月出したアイデアの数を取得
 */
export async function getIdeaMemosThisMonth(): Promise<number> {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/idea_memos/this_month_count`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
        cache: "no-store",
      },
    );
    const data = await response.json();
    return data.count;
  } catch (error) {
    throw new Error(`予期せぬエラーが発生しました: ${error}`);
  }
}

/**
 * アイデアメモ一覧を取得する
 */
export async function getAllIdeaMemos(): Promise<IdeaMemoType[]> {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(`${BASE_URL}/api/v1/idea_memos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
      cache: "no-store",
    });
    const serializedData = await response.json();
    if (serializedData === null) {
      return [];
    }
    // JSON APIのデータをデシリアライズ
    const deserializedData = await new Deserializer({
      keyForAttribute: "camelCase",
    }).deserialize(serializedData);
    return deserializedData;
  } catch (error) {
    throw new Error(`予期せぬエラーが発生しました: ${error}`);
  }
}

/**
 * アイデアメモを取得する
 */
export async function getIdeaMemo(uuid: string): Promise<IdeaMemoType> {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(`${BASE_URL}/api/v1/idea_memos/${uuid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
      cache: "no-store",
    });
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
    throw new Error(`予期せぬエラーが発生しました: ${error}`);
  }
}

/**
 * アイデアメモを更新する
 */

export async function updateIdeaMemo(uuid: string, memo: IdeaMemoType) {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(`${BASE_URL}/api/v1/idea_memos/${uuid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
      body: JSON.stringify({ idea_memo: { ...memo } }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`データ更新に失敗しました: ${data}`);
    }
    return data;
  } catch (error) {
    throw new Error(`予期せぬエラーが発生しました: ${error}`);
  }
}

/**
 * アイデアメモを削除する
 *
 * @param uuid
 * @returns Promise<void>
 */
export async function deleteIdeaMemo(uuid: string): Promise<void> {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(`${BASE_URL}/api/v1/idea_memos/${uuid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`データ更新に失敗しました: ${data}`);
    }
    return data;
  } catch (error) {
    throw new Error(`予期せぬエラーが発生しました: ${error}`);
  }
}
