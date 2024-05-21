"use client";

import { Fragment } from "react";
import Person from "@mui/icons-material/Person";
// Local CUSTOM COMPONENT
import UserInfo from "../user-info";
import UserAnalytics from "../user-analytics";
import DashboardHeader from "../../dashboard-header";
// CUSTOM DATA MODEL
import { User1 } from "models/User.model";
import { useSession } from "next-auth/react";
import Container from "@mui/material/Container";

const ProfilePageView = () => {
  const { data: session, status } = useSession();
  //
  const user = session?.user as User1;

  if (status === "loading") {
    return <Container>Loading...</Container>;
  }
  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader
        Icon={Person}
        title="My Profile"
        buttonText="Edit Profile"
        href={`/profile/${user?.id}`}
      />

      {/* USER PROFILE INFO */}
      <UserAnalytics user={user} />

      {/* USER PROFILE INFO */}
      <UserInfo user={user} />
    </Fragment>
  );
};

export default ProfilePageView;
