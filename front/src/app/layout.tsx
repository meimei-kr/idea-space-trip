import Footer from "@/components/layouts/Footer/Footer";
import Header from "@/components/layouts/Header/Header";
import Stars from "@/components/layouts/Stars/Stars";
import { Toaster } from "@/components/ui/toaster";
import NextAuthProvider from "@/context/AuthProvider";
import { neoneon, sawarabiGothic } from "@/fonts/fonts";
import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "IDEA SPACE TRIP",
  description:
    "IDEA SPACE TRIPは、AIと一緒にアイデアを考えることで、" +
    "アイデア出しが、簡単かつ楽しくなるようサポートするアプリです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${sawarabiGothic.variable} ${neoneon.variable}`}>
        <NextAuthProvider>
          <Stars />
          <Header />
          {children}
          <Toaster />
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
