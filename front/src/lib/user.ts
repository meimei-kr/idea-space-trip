"use server";

import { UserType } from "@/types";
import { Deserializer } from "jsonapi-serializer";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./options";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * ログインユーザーの情報を取得
 *
 * @returns user: UserType
 */
export async function getUser(): Promise<UserType> {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(`${BASE_URL}/api/v1/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
      next: { revalidate: 3600 },
    });
    if (response.status === 401) {
      throw new Error("Unauthorized");
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
 * ユーザーアカウントを削除
 */
export async function deleteUser() {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(`${BASE_URL}/api/v1/user`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    });
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
