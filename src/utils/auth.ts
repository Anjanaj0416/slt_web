import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { getServerSession } from "next-auth";
import { User1 } from "models/User.model";

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      issuer: process.env.KEYCLOAK_CLIENT_ISSUER,
      authorization: { params: { scope: "openid email profile phone" } },
    }),
  ], // rest of your config
  callbacks: {
    session({ token }) {
      const { user } = token as {
        user: User1;
      };
      //
      return {
        accessToken: token.accessToken as string,
        idToken: token.idToken as string,
        refreshToken: token.refreshToken as string,
        expires: token.expires as string,
        user: user,
      };
    },
  },
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
