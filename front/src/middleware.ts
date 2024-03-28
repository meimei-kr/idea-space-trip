export { default } from "next-auth/middleware";

export const config = {
  // ログインが必要なページのパスを指定
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
