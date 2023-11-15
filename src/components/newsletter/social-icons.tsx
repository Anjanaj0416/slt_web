import IconButton from "@mui/material/IconButton";
// MUI ICON COMPONENTS
import Google from "@mui/icons-material/Google";
import Twitter from "@mui/icons-material/Twitter";
import Instagram from "@mui/icons-material/Instagram";
import { FlexRowCenter } from "components/flex-box";
import Facebook from "icons/Facebook";

const STYLE = { fontSize: 20, color: "grey.900" };

const SocialIcons = () => {
  return (
    <FlexRowCenter mt={4} mb={2}>
      <IconButton>
        <Facebook sx={STYLE} />
      </IconButton>

      <IconButton>
        <Twitter sx={STYLE} />
      </IconButton>

      <IconButton>
        <Instagram sx={STYLE} />
      </IconButton>

      <IconButton>
        <Google sx={STYLE} />
      </IconButton>
    </FlexRowCenter>
  );
};

export default SocialIcons;
