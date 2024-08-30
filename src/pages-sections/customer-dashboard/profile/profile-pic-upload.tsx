import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CameraEnhance from "@mui/icons-material/CameraEnhance";
// GLOBAL CUSTOM COMPONENTS
import FlexBox from "components/flex-box/flex-box";
import { FC, useState } from "react";
import ENVIRONMENT from "config/environment";
import CropDialog from "components/cropper-dialog-box";
import { useSession } from "next-auth/react";
import { User1 } from "models/User.model";

type Props = {
  onProfileImage: (value: any) => void;
  profilePictureUrl?: string;
};
// ===========================================================
const ProfilePicUpload: FC<Props> = ({
  onProfileImage,
  profilePictureUrl,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>();
  const { data: session } = useSession();

  const handleCropImages = (croppedImages: File[]) => {
    onProfileImage(croppedImages[0]);
  };
  return (
    <FlexBox alignItems="flex-end" mb={3}>
      <CropDialog
        cropWidth={280}
        cropHeight={280}
        images={[selectedImage]}
        onSubmit={handleCropImages}
        open={open}
        setOpen={setOpen}
      />
      <Avatar
        alt={(session?.user as User1)?.firstName}
        src={
          !open && selectedImage
            ? selectedImage
            : `${ENVIRONMENT.S3_BUCKET_URL}/${profilePictureUrl}` 
        }
        sx={{ height: 64, width: 64 }}
      />

      <IconButton
        size="small"
        component="label"
        color="secondary"
        htmlFor="profile-image"
        sx={{ bgcolor: "grey.300", ml: -2.5 }}
      >
        <CameraEnhance fontSize="small" />
      </IconButton>

      <Box
        type="file"
        display="none"
        accept="image/*"
        component="input"
        id="profile-image"
        onChange={(e) => {
          setSelectedImage(URL.createObjectURL(e.target.files[0]));
          setOpen(true);
        }}
      />
    </FlexBox>
  );
};

export default ProfilePicUpload;
