import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      userId: string;
      accessToken?: string | undefined;
      provider?: string;
    } & DefaultSession["user"];
  }

  interface User {
    userId: string;
    accessToken?: string | undefined;
    provider?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    accessToken?: string | undefined;
    provider?: string;
  }
}
