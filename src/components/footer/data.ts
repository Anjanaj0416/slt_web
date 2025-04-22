// CUSTOM ICON COMPONENTS
import Google from "icons/Google";
import Twitter from "icons/Twitter";
import Youtube from "icons/Youtube";
import Facebook from "icons/Facebook";
import Instagram from "icons/Instagram";
import { ENVIRONMENT } from "config";

export const ABOUT_LINKS = [
  { text: "Careers", path: "/" },
  { text: "Our Stores", path: "/" },
  { text: "Terms & Conditions", path: "terms" },
  { text: "Privacy Policy", path: "privacy-policy" },
];

export const CUSTOMER_CARE_LINKS = [
  "Help Center",
  "Track Your Order",
  "Corporate & Bulk Purchasing",
  "Returns & Refunds",
];

export const SOCIAL_ICON_LINKS = [
  { Icon: Facebook, url: ENVIRONMENT.FACEBOOK_LINK },
  { Icon: Twitter, url: ENVIRONMENT.TWITTER_LINK },
  { Icon: Instagram, url: ENVIRONMENT.INSTAGRAM_LINK },
];
