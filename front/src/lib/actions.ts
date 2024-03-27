"use server";

import {
  createAIGeneratedThemes,
  deleteAIGeneratedThemes,
} from "@/lib/ai-generated-themes";
import { createIdeaMemos, updateIdeaMemo } from "@/lib/idea-memos";
import { updateIdeaSession } from "@/lib/idea-sessions";
import {
  ThemeCategoryEnum,
  ThemeQuestionEnum,
  getKeyByValue,
} from "@/utils/enums";
import { redirect } from "next/navigation";
import { z } from "zod";
import { deleteAiGeneratedAnswers } from "./ai-generated-answers";
import { updateAIUsageHistory } from "./ai-usage-history";

/**
 * テーマの入力を受け取り、idea_sessionsテーブルのthemeカラムを更新する
 */

export type ThemeState = {
  errors?: {
    theme?: string[];
  };
};

const ThemeSchema = z.object({
  theme: z
    .string()
    .trim()
    .min(1, { message: "テーマの入力は必須だよ" })
    .max(255, { message: "テーマは255文字以内で入力してね" }),
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

  // idea_sessionsテーブルのthemeカラムを更新
  await updateIdeaSession(uuid, { theme });

  redirect(`/${uuid}/generate-ideas`);
};

/**
 * テーマのカテゴリーを受け取り、idea_sessionsテーブルのtheme_categoryカラムを更新する
 */

export type ThemeCategoryState = {
  errors?: {
    option?: string[];
  };
};

const options = Object.keys(ThemeCategoryEnum);

const ThemeCategorySchema = z.object({
  option: z
    .string()
    .nullable()
    .refine((value) => value !== null && options.includes(value), {
      message: "以下は選択必須だよ",
    }),
  uuid: z.string(), // uuidはhiddenで自動的に送信されるため、厳密なバリデーションは不要
});

export const submitThemeCategory = async (
  prevState: ThemeCategoryState | undefined,
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

  if (option !== null) {
    // idea_sessionsテーブルのthemeCategoryカラムを更新
    await updateIdeaSession(uuid, { themeCategory: option });

    redirect(`/${uuid}/generate-theme`);
  }
};

/**
 * 質問への回答をもとに、テーマ案を生成する
 */

export type ThemeQuestionState = {
  errors?: {
    option?: string[];
    answer?: string[];
  };
};

const selectOptions = Object.keys(ThemeQuestionEnum);

const ThemeQuestionSchema = z.object({
  option: z
    .string()
    .nullable()
    .refine((value) => value !== null && selectOptions.includes(value), {
      message: "質問は選択必須だよ",
    }),
  answer: z
    .string()
    .trim()
    .min(1, { message: "回答入力は必須だよ" })
    .max(255, { message: "回答は255文字以内で入力してね" }),
  uuid: z.string(), // uuidはhiddenで自動的に送信されるため、厳密なバリデーションは不要
});

export const generateThemes = async (
  prevState: ThemeQuestionState | undefined,
  formData: FormData,
) => {
  // ThemeQuestionSchemaによるバリデーション
  const validatedThemeQuestion = ThemeQuestionSchema.safeParse({
    option: formData.get("option"),
    answer: formData.get("answer"),
    uuid: formData.get("uuid"),
  });

  // バリデーション失敗なら、エラーメッセージを返す
  if (!validatedThemeQuestion.success) {
    const errors = {
      errors: validatedThemeQuestion.error.flatten().fieldErrors,
    };
    return errors;
  }

  const { option, answer, uuid } = validatedThemeQuestion.data;

  if (option !== null && answer !== "") {
    // idea_sessionsテーブルのthemeQuestion, themeAnswerカラムを更新
    const updatedIdeaSession = await updateIdeaSession(uuid, {
      themeQuestion: option,
      themeAnswer: answer,
    });

    // updatedIdeaSessionの情報を元にテーマを生成
    const aiGeneratedThemes = await createAIGeneratedThemes(
      uuid,
      updatedIdeaSession,
    );
    if (!aiGeneratedThemes) {
      return {
        errors: {
          answer: [
            "無効なデータが入力されたよ。適切な入力に修正して、再度実行してね。",
          ],
        },
      };
    }
    redirect(`/${uuid}/generate-theme`);
  }
};

/**
 * 生成されたテーマ案の中から選択されたものを受取り、idea_sessionsテーブルのthemeカラムを更新する
 */

export type GeneratedThemesState = {
  errors?: {
    option?: string[];
  };
};

export const confirmTheme = async (
  prevState: ThemeCategoryState | undefined,
  formData: FormData,
) => {
  const ThemeCategorySchema = z.object({
    option: z
      .string()
      .nullable()
      .refine((value) => value !== null, {
        message: "以下は選択必須だよ",
      }),
    uuid: z.string(), // uuidはhiddenで自動的に送信されるため、厳密なバリデーションは不要
  });

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

  if (option !== null) {
    // idea_sessionsテーブルのthemeカラムを更新
    await updateIdeaSession(uuid, { theme: option });

    redirect(`/${uuid}/generate-ideas`);
  }
};

/**
 * 回答の入力を受け取り、idea_memosテーブルにデータを追加する
 */

export type MyIdeaState = {
  errors?: {
    idea?: string[];
  };
};

const IdeaSchema = z.object({
  idea: z
    .string()
    .trim()
    .min(1, { message: "アイデアの入力は必須だよ" })
    .max(255, { message: "アイデアは255文字以内で入力してね" }),
  uuid: z.string(), // uuidはhiddenで自動的に送信されるため、厳密なバリデーションは不要
  perspective: z.string(), // perspectiveはhiddenで自動的に送信されるため、厳密なバリデーションは不要
});

export const submitMyIdea = async (
  prevState: MyIdeaState | undefined,
  formData: FormData,
) => {
  // IdeaSchemaによるバリデーション
  const validatedIdea = IdeaSchema.safeParse({
    idea: formData.get("idea"),
    uuid: formData.get("uuid"),
    perspective: formData.get("perspective"),
  });

  // バリデーション失敗なら、エラーメッセージを返す
  if (!validatedIdea.success) {
    const errors = {
      errors: validatedIdea.error.flatten().fieldErrors,
    };
    return errors;
  }

  const { idea, uuid, perspective } = validatedIdea.data;

  // idea_memosテーブルにデータを挿入
  await createIdeaMemos(uuid, {
    perspective: getKeyByValue(perspective),
    answer: idea,
  });
};

/**
 * AIの回答を受け取り、idea_memosテーブルにデータを追加する
 */

export const submitAiAnswer = async (formData: FormData) => {
  // ユーザー入力はないため、バリデーションは不要
  const uuid = formData.get("uuid") as string;
  const perspective = formData.get("perspective") as string;
  const hint = formData.get("hint") as string;
  const answer = formData.get("answer") as string;

  // idea_memosテーブルにデータを挿入
  await createIdeaMemos(uuid, {
    perspective: getKeyByValue(perspective),
    hint: hint,
    answer: answer,
  });
};

/**
 * 回答、コメントの入力を受け取り、idea_memosテーブルのデータを更新する
 */

export type IdeaMemoState = {
  errors?: {
    idea?: string[];
    comment?: string[];
  };
  message?: string;
};

const IdeaMemoSchema = z.object({
  idea: z
    .string()
    .trim()
    .min(1, { message: "回答の入力は必須だよ" })
    .max(255, { message: "回答は255文字以内で入力してね" }),
  comment: z
    .string()
    .trim()
    .max(255, { message: "コメントは255文字以内で入力してね" }),
  uuid: z.string(), // uuidはhiddenで自動的に送信されるため、厳密なバリデーションは不要
});

export const submitUpdateIdeaMemo = async (
  prevState: IdeaMemoState | undefined,
  formData: FormData,
) => {
  // IdeaMemoSchemaによるバリデーション
  const validatedIdeaMemo = IdeaMemoSchema.safeParse({
    idea: formData.get("idea"),
    comment: formData.get("comment"),
    uuid: formData.get("uuid"),
  });

  // バリデーション失敗なら、エラーメッセージを返す
  if (!validatedIdeaMemo.success) {
    const errors = {
      errors: validatedIdeaMemo.error.flatten().fieldErrors,
    };
    return errors;
  }

  const { idea, comment, uuid } = validatedIdeaMemo.data;

  // idea_memosテーブルのデータを更新
  const successMessage = await updateIdeaMemo(uuid, {
    answer: idea,
    comment: comment,
  });
  return successMessage;
};

/**
 * セッションを終了する
 */
export const endSession = async (uuid: string) => {
  await Promise.all([
    // idea_sessionsテーブルのis_finishedをtrueにする
    updateIdeaSession(uuid, { isFinished: true }),
    // ai_generated_themes と ai_generated_answersテーブルのレコードを削除
    deleteAIGeneratedThemes(uuid),
    deleteAiGeneratedAnswers(uuid),
    // ai_usage_historiesテーブル の countを更新
    updateAIUsageHistory(),
  ]);
};
