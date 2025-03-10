export function extractRolesFromToken(token: any, clientId: string): string[] {
  const payload = decodeJwtPayload(token);
  try {
    if (
      payload?.resource_access &&
      payload.resource_access[clientId] &&
      payload.resource_access[clientId].roles
    ) {
      return payload.resource_access[clientId].roles;
    }
    return [];
  } catch (error) {
    console.log(error);
  }
}

function decodeJwtPayload(token: string): any {
  try {
    const base64Url = token.split(".")?.[1]; // Extract the payload part
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Fix encoding
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}
