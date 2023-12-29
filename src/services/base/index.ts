import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { getSession } from "next-auth/react";

// Define your base query with custom headers
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: async (headers, { getState }) => {
    const session: any = await getSession(); // Replace with your actual access token retrieval logic
    if (session?.accessToken) {
      headers.set("Authorization", `Bearer ${session?.accessToken}`);
    }
    // const accessToken = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI0Y3VaakdTWjlaVlI4Yll3SkdiT0xpREpzRmJTc3Zvam5JS2hRMWJuVEJFIn0.eyJleHAiOjE2OTkwMjU5NTgsImlhdCI6MTY5ODk4OTk1OCwianRpIjoiNDYxMzRmNGQtODNjMC00ZGEzLWJkOTktNDhjYTJmY2QyMDliIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmZpdG9uY29sbGVjdGlvbi5jb20vcmVhbG1zL21hcmtldHBsYWNlIiwic3ViIjoiYmI5NTE0ZWMtZWM0ZC00ZGE1LTg5ZGEtYzQyZDJjMWYwZmRkIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibWFya2V0cGxhY2UtY2xpZW50IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjMwMDAvKiIsImh0dHBzOi8vZGV2LmZpdG9uY29sbGVjdGlvbi5jb20vKiJdLCJyZXNvdXJjZV9hY2Nlc3MiOnsibWFya2V0cGxhY2UtY2xpZW50Ijp7InJvbGVzIjpbInVtYV9wcm90ZWN0aW9uIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIG1vYmlsZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY2xpZW50SG9zdCI6IjE3NS4xNTcuMTQ2LjE4MCIsInByZWZlcnJlZF91c2VybmFtZSI6InNlcnZpY2UtYWNjb3VudC1tYXJrZXRwbGFjZS1jbGllbnQiLCJjbGllbnRBZGRyZXNzIjoiMTc1LjE1Ny4xNDYuMTgwIiwiY2xpZW50X2lkIjoibWFya2V0cGxhY2UtY2xpZW50In0.TXr1I9tUe818OLqMybMzeOAz-SeBGrescNQpVcMuG1DiAmNq0o4nj2DtxwDhg-pZ5XHqBtejvt8yghQdwl4xtYv0qTSGIlnN7--v-HZOudJxkJF2rDPauiWlRcnb3kMmpBCNn8_MlvdccdqKXRER_woOv7G7WBJ1b18RX948FyDVAqCr0fKsiAGZBP_f1NpsWKD-IG-cDPxDyA_U_GwACuOMEbnUeJDU6Tje6EiHYPoX0vLnQxwDn3xrLnJHs2e-DT9csD7vAxmzRenRGM1_kKKy4SlevgGMNUMRsDz8aDyLQMZpPi9xUxIemiH81JwXkvS9DXQznezMsMTWn_q7Uw"
    // headers.set('Authorization', `Bearer ${accessToken}`);
    headers.set("Content-Type", "application/json");
    // headers.set('Access-Control-Allow-Origin', '*');
    // headers.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    return headers;
  },
});
//
export { baseQuery };
