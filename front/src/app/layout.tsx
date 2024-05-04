import Header from "@/components/layouts/Header/Header";
import Stars from "@/components/layouts/Stars/Stars";
import { Toaster } from "@/components/ui/toaster";
import NextAuthProvider from "@/context/global/AuthProvider";
import { TouchProvider } from "@/context/global/TouchProvider";
import { openSans, zenmaruGothic } from "@/fonts/fonts";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Toaster as HotToaster } from "react-hot-toast";
import "./globals.scss";

const siteName = "IDEA SPACE TRIP";
const description =
  "IDEA SPACE TRIPは、AIと一緒にアイデアを考えることで、" +
  "アイデア出しが、簡単かつ楽しくなるようサポートするアプリです。";
const url = "https://www.idea-space-trip.net";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: siteName,
    template: `%s - ${siteName}`,
  },
  description,
  openGraph: {
    title: siteName,
    description,
    url,
    siteName,
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: siteName,
    description,
    creator: "@meimei_kr_",
  },
  verification: {
    google: "ZLFhzMA6qFnzD_DTc19GMRX9cHsnhOwLcVdJfmszatk",
  },
  alternates: {
    canonical: url,
  },
};

const Footer = dynamic(() => import("@/components/layouts/Footer/Footer"));

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="manifest" href="/manifest/manifest.json" />
        <link rel="apple-touch-icon" href="/manifest/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#100706" />
      </head>
      <body className={`${zenmaruGothic.variable} ${openSans.variable}`}>
        <HotToaster position="top-center" reverseOrder={false} />
        <NextAuthProvider>
          <TouchProvider>
            <Stars />
            <Header />
            {children}
            <Toaster />
            <Footer />
          </TouchProvider>
        </NextAuthProvider>
      </body>
      <GoogleAnalytics gaId="G-BJ7Z6RGZJF" />
    </html>
  );
}
