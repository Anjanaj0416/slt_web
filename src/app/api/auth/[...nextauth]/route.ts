import NextAuth, { AuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import axios from "axios";
import { Adapter } from "next-auth/adapters";
import AuthAdapter from "utils/auth-adapter";
import { User1 } from "models/User.model";
import mapUser from "utils/mapUser";
import { extractRolesFromToken } from "utils/extract-roles";
//
const refreshTokens = async (refreshToken: string) => {
  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("client_id", process.env.KEYCLOAK_CLIENT_ID);
  params.append("client_secret", process.env.KEYCLOAK_CLIENT_SECRET);
  params.append("refresh_token", refreshToken);
  //
  const url = `${process.env.KEYCLOAK_CLIENT_ISSUER}/protocol/openid-connect/token`;
  try {
    const axiosRes = await axios.post(url, params);
    //
    return axiosRes?.data;
  } catch (error) {
    console.log(error?.data);
  }
};
//
const authOptions: AuthOptions = {
  //
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      issuer: process.env.KEYCLOAK_CLIENT_ISSUER,
      authorization: {
        params: { scope: "openid email profile phone", prompt: "login" },
      },
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  //
  callbacks: {
    session({ token }) {
      if (!token) {
        return;
      }
      const { user } = token as {
        user: User1;
      };
      //
      return {
        accessToken: token.accessToken as string,
        idToken: token.idToken as string,
        refreshToken: token.refreshToken as string,
        expires: token.expires as string,
        user: mapUser(user),
      };
    },
    //
    async jwt({ token, account, user, trigger, session }: any) {
      // The processing of JWT occurs before handling sessions.
      if (account) {
        // 'account' is only available the first time this callback is called on a new session
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.idToken = account.id_token;
        token.expires = account.expires_at;
        token.refreshTokenExpires = account.refresh_expires_in;
        token.user = {
          ...user,
          cart: { id: user?.cart?.id, cartItems: null },
          wishlist: { id: user?.wishlist?.id, products: null },
        };
      } else if (trigger === "update") {
        token.user = session.user;
      }
      //
      const timeDifferenceInSeconds =
        ((token.expires as number) * 1000 - Date.now()) / 1000;
      if (timeDifferenceInSeconds > 60) {
        return token;
      } else if (token?.expires) {
        // Renew tokens if access token is expired
        const newTokens = await refreshTokens(token?.refreshToken as string);
        return {
          ...token,
          accessToken: newTokens?.access_token,
          refreshToken: newTokens?.refresh_token,
          idToken: newTokens?.id_token,
          expires: Math.floor(Date.now() / 1000) + newTokens?.expires_in,
          refreshTokenExpires:
            Math.floor(Date.now() / 1000) + newTokens?.refresh_expires_in,
        };
      }
    },

    async signIn({ account }) {
      const roles = extractRolesFromToken(
        account?.access_token,
        "customer-marketplace-client"
      );
      return !!roles.includes("customer");
    },
  },
  adapter: AuthAdapter() as unknown as Adapter,
  //
  events: {
    signOut: async ({ token }) => {
      const url = new URL(
        `${process.env.KEYCLOAK_CLIENT_ISSUER}/protocol/openid-connect/logout`
      );
      url.searchParams.append(
        "id_token_hint",
        (token as { idToken: string }).idToken
      );
      url.searchParams.append(
        "post_logout_redirect_uri",
        process.env.NEXTAUTH_URL
      );
      //
      await axios.get(url.href);
    },
  },
  //
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
//
const handler = NextAuth(authOptions);
//
export { handler as GET, handler as POST };
