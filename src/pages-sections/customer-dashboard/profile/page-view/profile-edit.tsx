"use client";

import { Fragment } from "react";
import Person from "@mui/icons-material/Person";
// GLOBAL CUSTOM COMPONENTS
import Card1 from "components/Card1";
// Local CUSTOM COMPONENT
import ProfileEditForm from "../edit-form";
import ProfilePicUpload from "../profile-pic-upload";
import DashboardHeader from "../../dashboard-header";
// CUSTOM DATA MODEL
import User from "models/User.model";

// ===========================================================
type Props = { user: User };
// ===========================================================

const ProfileEditPageView = ({ user }: Props) => {
  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader
        Icon={Person}
        href="/profile"
        title="Edit Profile"
        buttonText="Back to Profile"
      />

      <Card1>
        {/* USER PROFILE PIC */}
        <ProfilePicUpload />

        {/* PROFILE EDITOR FORM */}
        <ProfileEditForm user={user} />
      </Card1>
    </Fragment>
  );
};

export default ProfileEditPageView;
