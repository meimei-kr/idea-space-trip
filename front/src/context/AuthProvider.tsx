"use client";

import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

const NextAuthProvider = ({ children }: PropsWithChildren) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
