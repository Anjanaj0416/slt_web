// CUSTOM ICON COMPONENTS
import XIcon from "@mui/icons-material/X";
import Facebook from "icons/Facebook";
import Instagram from "icons/Instagram";
import { ENVIRONMENT } from "config";

export const ABOUT_LINKS = [
  { text: "Careers", path: "/" },
  { text: "Our Stores", path: "/shops" },
  { text: "Terms & Conditions", path: "/terms" },
  { text: "Privacy Policy", path: "privacy-policy" },
];

export const CUSTOMER_CARE_LINKS = [
  { text: "Help Center", path: "/" },
  { text: "Track Your Order", path: "/orders" },
  { text: "Corporate & Bulk Purchasing", path: "/" },
  { text: "Returns & Refunds", path: "/returns" },
];

export const SOCIAL_ICON_LINKS = [
  { Icon: Facebook, url: ENVIRONMENT.FACEBOOK_LINK },
  { Icon: Instagram, url: ENVIRONMENT.INSTAGRAM_LINK },
  { Icon: XIcon, url: ENVIRONMENT.TWITTER_LINK },
];
