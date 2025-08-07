import Link from "next/link";
import { FC, useState } from "react";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import { useTranslation } from "react-i18next";
// MUI ICON COMPONENTS
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
// GLOBAL CUSTOM COMPONENTS
import { Span } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
// STYLED COMPONENTS
import { StyledContainer, StyledRoot } from "./styles";
import { ENVIRONMENT } from "config";
import { Box } from "@mui/material";

// ==============================================================
interface LanguageOption {
  [key: string]: { title: string; value: string };
}
// ==============================================================

// LANGUAGE OPTIONS
const languageOptions: LanguageOption = {
  en: { title: "EN", value: "en" },
  es: { title: "DE", value: "de" },
};

// ===========================================
type Props = { bgColor?: string };
// ===========================================

const Topbar: FC<Props> = ({ bgColor }) => {
  const { i18n, t } = useTranslation();
  const [expand, setExpand] = useState<boolean>(false);

  return (
    <StyledRoot bgColor={bgColor} expand={expand ? 1 : 0}>
      <Box
        sx={{
          gap: 2,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 2, md: 16 },
        }}
      >
        <FlexBetween width="100%">
          <FlexBox alignItems="center" gap={1}>
            <Chip
              label={t("HOT")}
              size="small"
              sx={{
                color: "white",
                fontWeight: 700,
                backgroundColor: "primary.main",
                "& .MuiChip-label": { pl: ".8rem", pr: ".8rem" },
              }}
            />
            <Span className="title">{t("Free Express Shipping")}</Span>
          </FlexBox>

          <IconButton
            disableRipple
            className="expand"
            onClick={() => setExpand((state) => !state)}
          >
            {expand ? <Remove /> : <Add />}
          </IconButton>
        </FlexBetween>

        <FlexBox className="topbarRight" alignItems="center">
          {/* LANGUAGE MENU SELECTOR */}
          {/* <BazaarMenu
            handler={
              <TouchRipple className="handler marginRight">
                <Span className="menuTitle">{selectedLanguage.title}</Span>
                <ExpandMore fontSize="inherit" />
              </TouchRipple>
            }
          >
            {Object.keys(languageOptions).map((language: string) => (
              <MenuItem
                className="menuItem"
                key={languageOptions[language].title}
                onClick={() => handleChangeLanguage(language)}
              >
                <Span className="menuTitle">
                  {languageOptions[language].title}
                </Span>
              </MenuItem>
            ))}
          </BazaarMenu> */}

          {/* SOCIAL LINKS AREA */}
          <FlexBox alignItems="center" gap={1.5}>
            {socialLinks.map(({ id, Icon, url }) => (
              <Link href={url} key={id}>
                <Icon sx={{ fontSize: 16 }} />
              </Link>
            ))}
          </FlexBox>
        </FlexBox>
      </Box>
    </StyledRoot>
  );
};

const socialLinks = [
  { id: 2, Icon: Facebook, url: ENVIRONMENT.FACEBOOK_LINK },
  { id: 3, Icon: Instagram, url: ENVIRONMENT.INSTAGRAM_LINK },
  { id: 1, Icon: XIcon, url: ENVIRONMENT.TWITTER_LINK },
];

export default Topbar;
