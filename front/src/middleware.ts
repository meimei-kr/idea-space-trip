export { default } from "next-auth/middleware";

export const config = {
  // 未認証でも使いたいパスはログイン制限から弾く
  matcher: [
    "/select-mode",
    "/:path/check-theme",
    "/:path/select-theme-category",
    "/:path/generate-theme",
    "/:path/input-theme",
    "/:path/generate-ideas",
    "/:path/end-session",
    "/idea-memos/:path",
    "/my-page",
  ],
};
