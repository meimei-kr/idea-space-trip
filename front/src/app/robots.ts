import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*", // すべてのクローラーが対象
      allow: "/",
      disallow: [
        "/*/check-theme",
        "/*/select-theme-category",
        "/*/generate-theme",
        "/*/input-theme",
        "/*/generate-ideas",
        "/*/end-session",
        "/idea-memos/*",
        "/my-page",
      ],
    },
  };
}
