import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Stars from "@/components/Stars/Stars";
import NextAuthProvider from "@/context/AuthProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <NextAuthProvider>
          <Stars />
          <Header />
          {children}
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
