/**
 * テーマカテゴリーEnumの定義
 */
enum ThemeCategoryEnum {
  Application = 10,
  Product = 20,
  Service = 30,
}

// 日本語とEnumのマッピング
// [key: string]: ThemeCategoryEnum は、keyがstring型で、valueがThemeCategoryEnum型のオブジェクトを表すインデックスシグネチャ
const mapThemeCategoryEnum: { [key: string]: ThemeCategoryEnum } = {
  アプリ: ThemeCategoryEnum.Application,
  商品: ThemeCategoryEnum.Product,
  サービス: ThemeCategoryEnum.Service,
};

// 日本語名からEnumの値を取得する関数
export function getThemeCategoryEnumValueFromJapanese(
  japanese: string,
): ThemeCategoryEnum | undefined {
  return mapThemeCategoryEnum[japanese];
}

// Enumに定義されている値の日本語名を配列として取得する関数
export function getJapaneseNamesFromThemeCategoryEnum(): string[] {
  return Object.keys(mapThemeCategoryEnum);
}
