"use server";

import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { authOptions } from "./options";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// 途中のアイデアセッションを取得
export async function getIdeaSessionInProgress() {
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
    const data = await response.json();
    if (Object.keys(data).length === 0 || data.length === 0) {
      return null;
    }
    return data[0];
  } catch (error) {
    console.error(error);
    throw new Error(`データ取得に失敗しました: ${error}`);
  }
}

// アイデアセッションを作成
export async function createIdeaSession(uuid: string) {
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
    if (!response.ok) {
      throw new Error(`データ作成に失敗しました: ${response.json()}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
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
    if (!response.ok) {
      throw new Error(`データ削除に失敗しました: ${response.json()}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error(`データ削除に失敗しました: ${error}`);
  }
}

// 現在のアイデアセッションを取得
export async function getIdeaSession() {
  const session = await getServerSession(authOptions);

  const headersList = headers();
  const header_url = headersList.get("x-url") || "";
  const uuid = header_url.split("/")[0];

  try {
    const response = await fetch(`${BASE_URL}/api/v1/idea_sessions/${uuid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
      cache: "no-store",
    });
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error(`データ取得に失敗しました: ${error}`);
  }
}
