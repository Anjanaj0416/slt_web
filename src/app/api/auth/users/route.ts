import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
//
export const POST = async (request: NextRequest) => {
  try {
    const body = (await request.json()) as any;
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
    return NextResponse.json(userResponse?.data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
};
//
export const GET = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams as any;
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
    let getUserByAttributeRequest = null;
    if (searchParams.get("email")) {
      getUserByAttributeRequest = {
        params: { email: searchParams.get("email") },
        headers,
      };
    } else if (searchParams.get("sub")) {
      getUserByAttributeRequest = {
        params: { sub: searchParams.get("sub") },
        headers,
      };
    }
    const userResponse = await axios.get(usersUrl, getUserByAttributeRequest);
    //
    return NextResponse.json(userResponse?.data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
};
