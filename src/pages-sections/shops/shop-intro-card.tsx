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

// =======================================================
type Props = {
  name: string;
  phone: string;
  email: string;
  address: string;
  socialLinks: SocialLink[];
  logoImage: string;
};
const icons = {
  facebook: <FacebookFilled sx={{ fontSize: 27 }} />,
  twitter: <TwitterFilled sx={{ fontSize: 27 }} />,
  instagram: <InstagramFilled sx={{ fontSize: 27 }} />,
  linkedin: <LinkedinFilled sx={{ fontSize: 27 }} />,
};
// =======================================================

const ShopIntroCard: FC<Props> = (props: Props) => {
  const { name, phone, email, address, logoImage, socialLinks } = props || {};

  return (
    <Card sx={{ mb: 4, pb: 2.5 }}>
      <Box height="202px" sx={{ backgroundColor: "secondary.main" }} />

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
              <H3 fontWeight="600" color="grey.100">
                {name}
              </H3>
            </Box>

            <FlexBox my={1} gap={1.5}>
              {socialLinks.map((item, ind) => (
                <Link
                  href={item.link}
                  target="_blank"
                  //rel="noreferrer noopener"
                  key={ind}
                >
                  {icons[item.name]}
                </Link>
              ))}
            </FlexBox>
          </FlexBetween>

          <FlexBetween flexWrap="wrap">
            <div>
              {/* <FlexBox alignItems="center" gap={1} mb={2}>
                <Rating color="warn" size="small" value={5} readOnly />
                <Small color="grey.600" display="block">
                  (45)
                </Small>
              </FlexBox> */}

              <FlexBox color="grey.600" gap={1} mb={1} maxWidth={270}>
                <Place fontSize="small" sx={{ fontSize: 18, mt: "3px" }} />
                <Span color="grey.600">{address}</Span>
              </FlexBox>

              <FlexBox color="grey.600" gap={1} mb={1}>
                <Call fontSize="small" sx={{ fontSize: 18, mt: "2px" }} />
                <Span color="grey.600">{phone}</Span>
              </FlexBox>
            </div>

            {email ? (
              <a target="_blank" href={`mailto:${email}`}>
                <Button variant="outlined" color="primary" sx={{ my: 1.5 }}>
                  Contact Vendor
                </Button>
              </a>
            ) : (
              <Button disabled variant="outlined" color="primary" sx={{ my: 1.5 }}>
                Contact Vendor
              </Button>
            )}
          </FlexBetween>
        </Box>
      </FlexBox>
    </Card>
  );
};

export default ShopIntroCard;
