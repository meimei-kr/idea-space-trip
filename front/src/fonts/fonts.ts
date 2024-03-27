import { Open_Sans, Zen_Maru_Gothic } from "next/font/google";

const zenmaruGothic = Zen_Maru_Gothic({
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-zenmaru-gothic",
  preload: false,
});

const openSans = Open_Sans({
  weight: "700",
  display: "swap",
  variable: "--font-open-sans",
  preload: false,
});

export { openSans, zenmaruGothic };
