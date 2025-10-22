"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const LoginPageView = () => {
  const searchParams = useSearchParams();
  const callbackPath = searchParams.get("callbackPath") || "";
  useEffect(() => {
    const signInWithKeycloak = async () => {
      await signIn("keycloak", {
        callbackUrl: `${window.location.origin}${callbackPath}`,
      });
    };
    //
    signInWithKeycloak();
  }, [callbackPath]);

  return <></>;
};

export default LoginPageView;
