"use client";

import { Fragment, useState } from "react";
import Card from "@mui/material/Card";
import Person from "@mui/icons-material/Person";
// Local CUSTOM COMPONENT
import ProfileEditForm from "../edit-form";
import ProfilePicUpload from "../profile-pic-upload";
import DashboardHeader from "../../dashboard-header";
// CUSTOM DATA MODEL
import { User1 } from "models/User.model";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useGetUserByIdQuery, useUpdateUserMutation } from "services/user-api";
import { useLazyCreateSignUrlQuery } from "services/file-api";
import axios from "axios";
import { fileTypes, getFilePath } from "utils/constants";
import { Container } from "@mui/material";

const ProfileEditPageView = () => {
  const { data: session, update } = useSession();
  const user = session?.user as User1;
  const router = useRouter();
  //
  const { data, isLoading } = useGetUserByIdQuery({ userId: user?.id });
  const [profileImage, setProfileImage] = useState<File>();
  //
  const [updateUser] = useUpdateUserMutation();
  const [createSignUrl] = useLazyCreateSignUrlQuery();

  const uploadProfileImage = async () => {
    try {
      if (profileImage?.name) {
        //setUploading(true);
        const extension = `${profileImage?.name
          .split(".")
          .slice(-1)}`.toUpperCase();
        const { data }: any = await createSignUrl({
          type: fileTypes.PROFILE_PICTURE,
          extension: extension,
          userId: user?.id,
        });
        const preSignedUrl = data?.url;

        let options = {
          headers: {
            "Content-Type": profileImage.type,
          },
        };

        await axios.put(preSignedUrl, profileImage, options);
        const path = getFilePath(
          {
            userId: user?.id,
            extension: `${extension}`.toLocaleLowerCase(),
            uuid: data?.key,
          },
          fileTypes.PROFILE_PICTURE
        );

        return path;
      }
    } catch (error) {
      console.log(error);
    } finally {
      //setUploading(false);
    }
  };

  const handleSubmit = async (values) => {
    const uploadedImagePath = await uploadProfileImage();
    updateUser({
      userId: user?.id,
      body: {
        ...values,
        username: user?.username,
        profilePictureUrl: uploadedImagePath || user?.profilePictureUrl,
      },
    })
      .unwrap()
      .then((data) => {
        update({ user: data });
        router.push("/profile");
      })
      .catch(() => {});
  };

  if (isLoading) {
    return <Container>Loading...</Container>;
  }
  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader
        Icon={Person}
        href="/profile"
        title="Edit Profile"
        buttonText="Back to Profile"
      />

      <Card sx={{ p: 3 }}>
        {/* USER PROFILE PIC */}
        <ProfilePicUpload
          profilePictureUrl={user?.profilePictureUrl}
          onProfileImage={(img) => {
            setProfileImage(img);
          }}
        />

        {/* PROFILE EDITOR FORM */}
        <ProfileEditForm user={data} onSubmit={handleSubmit} />
      </Card>
    </Fragment>
  );
};

export default ProfileEditPageView;
