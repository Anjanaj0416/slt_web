"use client";

import { Fragment, PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
// LOCAL CUSTOM COMPONENTS
import BoxLink from "./box-link";
import LogoWithTitle from "./logo-title";
import SocialButtons from "./social-buttons";
// GLOBAL CUSTOM COMPONENTS
import { FlexBox, FlexRowCenter } from "components/flex-box";
// COMMON STYLED COMPONENT
import { Wrapper } from "./styles";

const AuthLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();

  let bottomContent = null;

  // APPLIED FOR ONLY LOGIN PAGE
  if (pathname === "/login") {
    bottomContent = (
      <Fragment>
        {/* DON'T HAVE ACCOUNT AREA */}
        <FlexRowCenter gap={1} my={3}>
          Don&apos;t have account?
          <BoxLink title="Register" href="/register" />
        </FlexRowCenter>

        {/* FORGET YOUR PASSWORD AREA */}
        <FlexBox gap={1} py={2} borderRadius={1} justifyContent="center" bgcolor="grey.200">
          Forgot your password?
          <BoxLink title="Reset It" href="/reset-password" />
        </FlexBox>
      </Fragment>
    );
  }

  // APPLIED FOR ONLY REGISTER PAGE
  if (pathname === "/register") {
    bottomContent = (
      <Fragment>
        {/* LOGIN BUTTON AREA */}
        <FlexRowCenter gap={1} mt={3}>
          Already have an account?
          <BoxLink title="Login" href="/login" />
        </FlexRowCenter>
      </Fragment>
    );
  }

  // APPLIED FOR ONLY RESET PASSWORD PAGE
  if (pathname === "/reset-password") {
    return (
      <FlexRowCenter flexDirection="column" minHeight="100vh" px={2}>
        <Wrapper elevation={3}>{children}</Wrapper>
      </FlexRowCenter>
    );
  }

  return (
    <FlexRowCenter flexDirection="column" minHeight="100vh" px={2}>
      <Wrapper elevation={3}>
        {/* LOGO WITH TITLE AREA */}
        <LogoWithTitle />

        {/* FORM AREA */}
        {children}

        {/* SOCIAL BUTTON AREA */}
        <SocialButtons />

        {/* RENDER BOTTOM CONTENT BASED ON CONDITION */}
        {bottomContent}
      </Wrapper>
    </FlexRowCenter>
  );
};

export default AuthLayout;
