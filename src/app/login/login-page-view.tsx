"use client";

import { CircularProgress } from "@mui/material";
import { FlexRowCenter } from "components/flex-box";
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

  return (
    <FlexRowCenter minHeight="100vh">
      <CircularProgress color="primary" />
    </FlexRowCenter>
  );
};

export default LoginPageView;
