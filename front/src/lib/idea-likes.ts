"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { authOptions } from "./options";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * アイデアメモをお気に入り登録する
 *
 * @param uuid
 */
export async function createIdeaLike(uuid: string) {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/idea_memos/${uuid}/idea_likes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      },
    );
    if (response.status === 401) {
      throw new Error("Unauthorized");
    }
    if (!response.ok) {
      throw new Error("お気に入り登録に失敗しました");
    }
    revalidatePath("/idea-memos");
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      redirect("/auth/signin");
    }
    throw new Error(`予期せぬエラーが発生しました: ${error}`);
  }
}

/**
 * アイデアメモをお気に入り登録解除する
 *
 * @param uuid
 */
export async function deleteIdeaLike(uuid: string) {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/idea_memos/${uuid}/idea_likes`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      },
    );
    if (response.status === 401) {
      throw new Error("Unauthorized");
    }
    if (!response.ok) {
      throw new Error("お気に入り登録解除に失敗しました");
    }
    revalidatePath("/idea-memos");
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      redirect("/auth/signin");
    }
    throw new Error(`予期せぬエラーが発生しました: ${error}`);
  }
}
