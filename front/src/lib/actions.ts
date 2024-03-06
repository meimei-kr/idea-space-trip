"use server";

import { updateIdeaSession } from "@/lib/idea-sessions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

/**
 * テーマの入力を受け取り、idea_sessionテーブルのthemeカラムを更新する
 */
export type ThemeState = {
  errors?: {
    theme?: string[];
  };
};

const ThemeSchema = z.object({
  theme: z.string().trim().min(1, { message: "Error: テーマの入力は必須だよ" }),
  uuid: z.string(), // uuidはhiddenで自動的に送信されるため、厳密なバリデーションは不要
});

export const submitTheme = async (
  prevState: ThemeState,
  formData: FormData,
) => {
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
  await updateIdeaSession(uuid, { theme });

  revalidatePath(`${uuid}/generate-ideas`);
  redirect(`${uuid}/generate-ideas`);
};

/**
 * テーマのカテゴリーを受け取り、idea_sessionテーブルのtheme_categoryカラムを更新する
 */
// Enumの定義
enum ThemeCategoryEnum {
  アプリ = 1,
  商品 = 2,
  サービス = 3,
}

export type ThemeCategoryState = {
  errors?: {
    option?: string[];
  };
};

const options = ["アプリ", "商品", "サービス"];
const ThemeCategorySchema = z.object({
  option: z
    .string()
    .nullable()
    .refine((value) => value !== null && options.includes(value), {
      message: "Error: 以下は選択必須だよ",
    }),
  uuid: z.string(), // uuidはhiddenで自動的に送信されるため、厳密なバリデーションは不要
});

export const submitThemeCategory = async (
  prevState: ThemeCategoryState,
  formData: FormData,
) => {
  // ThemeCategorySchemaによるバリデーション
  const validatedThemeCategory = ThemeCategorySchema.safeParse({
    option: formData.get("option"),
    uuid: formData.get("uuid"),
  });

  // バリデーション失敗なら、エラーメッセージを返す
  if (!validatedThemeCategory.success) {
    const errors = {
      errors: validatedThemeCategory.error.flatten().fieldErrors,
    };
    return errors;
  }

  const { option, uuid } = validatedThemeCategory.data;

  // 送信されたoption(string)をキーに対応するEnumの数値を取得
  const themeCategory =
    ThemeCategoryEnum[option as keyof typeof ThemeCategoryEnum];

  // idea_sessionテーブルのthemeカラムを更新
  await updateIdeaSession(uuid, { themeCategory });

  revalidatePath(`${uuid}/generate-theme`);
  redirect(`${uuid}/generate-theme`);
};