import { FC } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// MUI ICON COMPONENTS
import Call from "@mui/icons-material/Call";
import Place from "@mui/icons-material/Place";
// GLOBAL CUSTOM COMPONENTS
import { H3, Span } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
// CUSTOM ICON COMPONENTS
import TwitterFilled from "icons/TwitterFilled";
import LinkedinFilled from "icons/LinkedinFilled";
import FacebookFilled from "icons/FacebookFilled";
import InstagramFilled from "icons/InstagramFilled";
import SocialLink from "models/SocialLink.model";
import { ENVIRONMENT } from "config";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { User1 } from "models/User.model";
import { useUpdateUserMutation } from "services/user-api";
import { useUnAuthenticatedModal } from "components/modals/unauthenticated-action-modal";
import { IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import mapUser from "utils/mapUser";
import { useSnackbar } from "notistack";

// =======================================================
type Props = {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  socialLinks: SocialLink[];
  logoImage: string;
  coverImage: string;
};
const icons = {
  facebook: <FacebookFilled sx={{ fontSize: 27 }} />,
  twitter: <TwitterFilled sx={{ fontSize: 27 }} />,
  instagram: <InstagramFilled sx={{ fontSize: 27 }} />,
  linkedin: <LinkedinFilled sx={{ fontSize: 27 }} />,
};
// =======================================================

const ShopIntroCard: FC<Props> = ({
  id,
  name,
  phone,
  email,
  address,
  logoImage,
  coverImage,
  socialLinks,
}: Props) => {
  const { data, update: updateSession } = useSession();
  const user = data?.user as User1;
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const { setIsOpen: openUnAuthenticatedModal } = useUnAuthenticatedModal();
  const { enqueueSnackbar } = useSnackbar();

  const addToFollowing = async () => {
    if (!user) {
      openUnAuthenticatedModal(true);
      return;
    }

    const followedIds = user?.followedStores.map((store) => store.id);

    const newFollowedIds =
      followedIds?.length > 0
        ? Array.from(new Set([...followedIds, id]))
        : [id];
    try {
      const updatedUser = await updateUser({
        userId: user?.id,
        body: {
          followedStoreIds: newFollowedIds,
        },
      });
      updateSession({ ...data, user: mapUser((updatedUser as any).data) });
      enqueueSnackbar("Added to Favorites", { variant: "success" });
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromFollowing = async () => {
    if (!user) {
      openUnAuthenticatedModal(true);
      return;
    }
    const followedStores = user?.followedStores.filter(
      (store) => store.id !== id
    );
    const newFollowedIds = followedStores.map((store) => store.id);

    try {
      const updatedUser = { ...user, followedStores };
      updateSession({ ...data, user: updatedUser });
      await updateUser({
        userId: user?.id,
        body: {
          followedStoreIds: newFollowedIds,
        },
      });
      enqueueSnackbar("Removed from Favorites", { variant: "success" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card
      sx={{
        mb: 4,
        pb: 2.5,
      }}
    >
      <FlexBox
        alignItems={"start"}
        justifyContent="right"
        height="202px"
        pr={1}
        sx={{
          backgroundColor: "secondary.main",
          backgroundImage: `url('${ENVIRONMENT.S3_BUCKET_URL}/${coverImage}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {user?.followedStores?.find((store) => store.id === id) ? (
          <IconButton
            color="secondary"
            aria-label="filled heart"
            title="Remove from favorites"
            sx={{ color: "#D23F57" }}
            disabled={isUpdating}
            onClick={removeFromFollowing}
          >
            <FavoriteIcon />
          </IconButton>
        ) : (
          <IconButton
            aria-label="outlined heart"
            title="Add to favorites"
            disabled={isUpdating}
            onClick={addToFollowing}
          >
            <FavoriteBorderIcon sx={{ color: "#D23F57" }} />
          </IconButton>
        )}
      </FlexBox>

      <FlexBox mt={-8} px={3.75} flexWrap="wrap">
        <Avatar
          alt={name}
          src={`${ENVIRONMENT.S3_BUCKET_URL}/${logoImage}`}
          sx={{
            mr: "37px",
            width: "120px",
            height: "120px",
            border: "4px solid",
            borderColor: "grey.100",
          }}
        />

        <Box
          sx={{
            flex: "1 1 0",
            minWidth: "250px",
            "@media only screen and (max-width: 500px)": { marginLeft: 0 },
          }}
        >
          <FlexBetween flexWrap="wrap" mt={0.375} mb={3}>
            <Box
              my={1}
              p="4px 16px"
              borderRadius="4px"
              display="inline-block"
              bgcolor="primary.main"
            >
              <H3
                fontWeight="600"
                color="grey.100"
                sx={{ textTransform: "capitalize" }}
              >
                {name}
              </H3>
            </Box>
          </FlexBetween>

          <FlexBetween flexWrap="wrap">
            <div>
              {/* <FlexBox alignItems="center" gap={1} mb={2}>
                <Rating color="warn" size="small" value={5} readOnly />
                <Small color="grey.600" display="block">
                  (45)
                </Small>
              </FlexBox> */}
            </div>
          </FlexBetween>
        </Box>
      </FlexBox>
    </Card>
  );
};

export default ShopIntroCard;
