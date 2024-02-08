import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user, account }) {
      const provider = account?.provider;
      const name = user?.name;
      const email = user?.email;
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/${provider}/callback`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ provider, name, email }),
          },
        );
        if (response.ok) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      // TODO: あとでパスを変更
      return baseUrl;
    },
  },
};
