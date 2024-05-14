"use server";

import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";

export const isMobile = () => {
  if (typeof process === "undefined") {
    throw new Error("Server only moduleをサーバーサイド以外で使っています");
  }

  const { get } = headers();
  const ua = get("user-agent");

  const device = new UAParser(ua || "").getDevice();

  return device.type === "mobile";
};
