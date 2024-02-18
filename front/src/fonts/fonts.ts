import { Sawarabi_Gothic } from "next/font/google";
import localFont from "next/font/local";

// グローバルフォント
const sawarabiGothic = Sawarabi_Gothic({
  weight: "400",
  display: "swap",
  variable: "--font-sawarabi-gothic",
  preload: false,
});

// カスタムローカルフォント
const neoneon = localFont({
  src: "../../public/fonts/Neoneon.otf",
  display: "swap",
  variable: "--font-neoneon",
  preload: false,
});

export { neoneon, sawarabiGothic };
