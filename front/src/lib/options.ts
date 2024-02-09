import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize() {
        const user = await axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/guest/signin`)
          .then((res) => res.data.user);
        if (user) {
          console.log("created guest user");
          console.log(user);
          return user;
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user, account, credentials }) {
      console.log({ user, account, credentials });
      if (credentials) {
        return true;
      }

      const provider = account?.provider;
      const name = user?.name;
      const email = user?.email;
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/${provider}/callback`,
          { provider, name, email },
        );
        if (response.status === 200) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    async redirect({ baseUrl }) {
      // TODO: あとでパスを変更
      return baseUrl;
    },
  },
};
