"use client";

import { signIn } from "next-auth/react";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
   // signIn("keycloak", { callbackUrl: "/orders" });
  }, []);
  return <div></div>;
}
