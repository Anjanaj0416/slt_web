import axios from "axios";
import { AdapterUser } from "next-auth/adapters";
export interface CustomAdapterUser extends AdapterUser {
  phone: string;
}
//
export default function AuthAdapter(): any {
  async function createUserAndHandleErrors(data: CustomAdapterUser) {
    try {
      const createUserRequest = {
        firstName: data.name.split(" ")[0] ?? "",
        lastName: data.name.split(" ")[1] ?? "",
        email: data.email ?? "",
        username: data.email ?? "",
        phone: data.phone ?? "",
      };
      //
      const response = await axios.post(
        `${process.env.NEXTAUTH_URL}/api/auth/users`,
        createUserRequest,
      );
      return response?.data;
    } catch (error) {
      return;
    }
  }

  return {
    createUser: createUserAndHandleErrors,
    async getUser(id: string): Promise<AdapterUser> {
      try {
        const getUserBySubRequest = { params: { sub: id } };
        const response = await axios.get(
          `${process.env.NEXTAUTH_URL}/api/auth/users`,
          getUserBySubRequest,
        );
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
          getUserByEmailRequest,
        );
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
          getUserBySubRequest,
        );
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
