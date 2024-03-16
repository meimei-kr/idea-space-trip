/**
 * テーマカテゴリーEnumの定義
 */
export enum ThemeCategoryEnum {
  application = "アプリ",
  product = "商品",
  service = "サービス",
}

/**
 * テーマ生成用質問Enumの定義
 */
export enum ThemeQuestionEnum {
  question1 = "あなたの好きなものは？",
  question2 = "こんなものがあったらいいな、と思うものは？",
  question3 = "普段、課題・不満に思っていることは？",
}

/**
 * 観点Enumの定義
 */
enum PerspectiveEnum {
  modify = "変更",
  substitute = "代用",
  reverse = "逆転",
  combine = "結合",
  magnify = "拡大",
  minify = "縮小",
}

const perspectiveValueToKey: { [key: string]: string } = Object.entries(
  PerspectiveEnum,
).reduce((acc, [key, value]) => ({ ...acc, [value]: key }), {});

// 値からキーを取得する関数
export function getKeyByValue(value: string) {
  return perspectiveValueToKey[value];
}
