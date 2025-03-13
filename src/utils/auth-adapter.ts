import axios from "axios";
import { AdapterUser } from "next-auth/adapters";
export interface CustomAdapterUser extends AdapterUser {
  phone: string;
}
//
export default function AuthAdapter(): any {
  const createUserIndDb = async (data: CustomAdapterUser) => {
    try {
      const body = {
        firstName: data.name.split(" ")[0] ?? "",
        lastName: data.name.split(" ")[1] ?? "",
        email: data.email,
      };
      const tokenUrl = `${process.env.KEYCLOAK_CLIENT_ISSUER}/protocol/openid-connect/token`;
      const clientId = process.env.KEYCLOAK_CLIENT_ID;
      const clientSecret = process.env.KEYCLOAK_CLIENT_SECRET;
      //
      const tokenParams = new URLSearchParams();
      tokenParams.append("client_id", clientId);
      tokenParams.append("client_secret", clientSecret);
      tokenParams.append("grant_type", "client_credentials");
      const tokenData = await axios.post(tokenUrl, tokenParams);
      //
      const usersUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/users`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenData?.data?.access_token}`,
      };
      const userResponse = await axios.post(usersUrl, body, { headers });
      //
      return userResponse?.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    createUser: createUserIndDb,
    async getUser(id: string): Promise<AdapterUser> {
      try {
        const getUserBySubRequest = { params: { sub: id } };
        const response = await axios.get(
          `${process.env.NEXTAUTH_URL}/api/auth/users`,
          getUserBySubRequest
        );
        //
        return response?.data?.data[0] as unknown as AdapterUser;
      } catch (error) {
        return;
      }
    },
    async getUserByEmail(email: string): Promise<AdapterUser> {
      try {
        const getUserByEmailRequest = { params: { email } };
        const response = await axios.get(
          `${process.env.NEXTAUTH_URL}/api/auth/users`,
          getUserByEmailRequest
        );
        //
        return response?.data?.data[0] as unknown as AdapterUser;
      } catch (error) {
        return;
      }
    },
    async getUserByAccount({ providerAccountId }) {
      try {
        const getUserBySubRequest = { params: { sub: providerAccountId } };
        const response = await axios.get(
          `${process.env.NEXTAUTH_URL}/api/auth/users`,
          getUserBySubRequest
        );
        //
        return response?.data?.data[0] as unknown as AdapterUser;
      } catch (error) {
        return;
      }
    },
    async updateUser() {
      return;
    },
    async deleteUser() {
      return;
    },
    async linkAccount() {
      return;
    },
    async unlinkAccount({}) {
      return;
    },
    async createSession({}) {
      return;
    },
    async getSessionAndUser() {
      return;
    },
    async updateSession({}) {
      return;
    },
    async deleteSession() {
      return;
    },
    async createVerificationToken({}) {
      return;
    },
    async useVerificationToken({}) {
      return;
    },
  };
}
