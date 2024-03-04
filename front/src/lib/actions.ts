"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { updateIdeaSession } from "./idea-sessions";

export type State = {
  errors?: {
    theme?: string[];
  };
};

const ThemeSchema = z.object({
  theme: z.string().trim().min(1, { message: "テーマを入力してください" }),
  uuid: z.string(), // uuidはhiddenで自動的に送信されるため、厳密なバリデーションは不要
});

export const submitTheme = async (prevState: State, formData: FormData) => {
  // ThemeSchemaによるバリデーション
  const validatedTheme = ThemeSchema.safeParse({
    theme: formData.get("theme"),
    uuid: formData.get("uuid"),
  });

  // バリデーション失敗なら、エラーメッセージを返す
  if (!validatedTheme.success) {
    const errors = {
      errors: validatedTheme.error.flatten().fieldErrors,
    };
    return errors;
  }

  const { theme, uuid } = validatedTheme.data;

  // idea_sessionテーブルのthemeカラムを更新
  updateIdeaSession(uuid, { theme });

  revalidatePath(`${uuid}/generate-ideas`);
  redirect(`${uuid}/generate-ideas`);
};
