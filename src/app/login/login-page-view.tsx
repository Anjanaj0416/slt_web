"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const LoginPageView = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  useEffect(() => {
    const signInWithKeycloak = async () => {
      await signIn("keycloak", {
        callbackUrl,
      });
    };
    //
    signInWithKeycloak();
  }, [callbackUrl]);

  return <></>;
};

export default LoginPageView;
