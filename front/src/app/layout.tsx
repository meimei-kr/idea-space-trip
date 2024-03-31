import Footer from "@/components/layouts/Footer/Footer";
import Header from "@/components/layouts/Header/Header";
import Stars from "@/components/layouts/Stars/Stars";
import { Toaster } from "@/components/ui/toaster";
import NextAuthProvider from "@/context/AuthProvider";
import { TouchProvider } from "@/context/TouchContext";
import { openSans, zenmaruGothic } from "@/fonts/fonts";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
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
        <GoogleAnalytics gaId="G-ZER08G5VVW" />
      </body>
    </html>
  );
}
