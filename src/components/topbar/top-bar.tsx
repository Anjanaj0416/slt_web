import { FC, useState } from "react";
import Link from "next/link";
import { useRouter, useParams, usePathname } from "next/navigation";
import { Chip, IconButton, MenuItem } from "@mui/material";
import { Add, ExpandMore, Facebook, Instagram, Remove, Twitter } from "@mui/icons-material";
import TouchRipple from "@mui/material/ButtonBase";
// GLOBAL CUSTOM COMPONENTS
import { Span } from "components/Typography";
import BazaarMenu from "components/BazaarMenu";
import { FlexBetween, FlexBox } from "components/flex-box";
// STYLED COMPONENTS
import { StyledContainer, TopbarWrapper } from "./styles";

// ===========================================
type TopbarProps = { bgColor?: string };
// ===========================================

const Topbar: FC<TopbarProps> = ({ bgColor }) => {
  const router = useRouter();

  const pathname = usePathname();
  const params = useParams();

  // const { asPath, query } = router;

  const [expand, setExpand] = useState<boolean>(false);
  // const [language, setLanguage] = useState(router.locale);

  const handleLanguageClick = (lang: string) => () => {
    // setLanguage(lang);
    // router.push({ pathname, query }, asPath, { locale: lang });
  };

  return (
    <TopbarWrapper bgColor={bgColor} expand={expand ? 1 : 0}>
      <StyledContainer>
        <FlexBetween width="100%">
          <FlexBox alignItems="center" gap={1}>
            <Chip
              label="HOT"
              size="small"
              sx={{
                color: "white",
                fontWeight: 700,
                backgroundColor: "primary.main",
                "& .MuiChip-label": { pl: ".8rem", pr: ".8rem" },
              }}
            />
            <Span className="title">Free Express Shipping</Span>
          </FlexBox>

          <IconButton disableRipple className="expand" onClick={() => setExpand((state) => !state)}>
            {expand ? <Remove /> : <Add />}
          </IconButton>
        </FlexBetween>

        <FlexBox className="topbarRight" alignItems="center">
          {/* LANGUAGE MENU SELECTOR */}
          <BazaarMenu
            handler={
              <TouchRipple className="handler marginRight">
                <Span className="menuTitle">EN</Span>
                <ExpandMore fontSize="inherit" />
              </TouchRipple>
            }
          >
            {languageList.map((item) => (
              <MenuItem
                key={item.title}
                className="menuItem"
                onClick={handleLanguageClick(item.value)}
              >
                <Span className="menuTitle">{item.title}</Span>
              </MenuItem>
            ))}
          </BazaarMenu>

          {/* SOCIAL LINKS AREA */}
          <FlexBox alignItems="center" gap={1.5}>
            {socialLinks.map(({ id, Icon, url }) => (
              <Link href={url} key={id}>
                <Icon sx={{ fontSize: 16 }} />
              </Link>
            ))}
          </FlexBox>
        </FlexBox>
      </StyledContainer>
    </TopbarWrapper>
  );
};

const socialLinks = [
  { id: 1, Icon: Twitter, url: "#" },
  { id: 2, Icon: Facebook, url: "#" },
  { id: 3, Icon: Instagram, url: "#" },
];

const languageList = [
  { title: "EN", value: "en" },
  { title: "DE", value: "de" },
];

export default Topbar;
