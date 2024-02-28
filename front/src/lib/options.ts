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
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
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
            body: JSON.stringify({
              user: {
                provider,
                name,
                email,
              },
            }),
          },
        );
        if (response.status === 200) {
          const data = await response.json();
          user.userId = data.user.id;
          user.accessToken = data.accessToken;
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    async jwt({ token, account, user }) {
      if (account && user) {
        token.userId = user.userId;
        token.accessToken = user.accessToken;
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
};
