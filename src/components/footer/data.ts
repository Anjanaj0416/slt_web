// CUSTOM ICON COMPONENTS
import Google from "icons/Google";
import Twitter from "icons/Twitter";
import Youtube from "icons/Youtube";
import Facebook from "icons/Facebook";
import Instagram from "icons/Instagram";
import { ENVIRONMENT } from "config";

export const ABOUT_LINKS = [
  "Careers",
  "Our Stores",
  "Our Cares",
  "Terms & Conditions",
  "Privacy Policy",
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
  { Icon: Youtube, url: "#" },
  { Icon: Google, url: "#" },
  { Icon: Instagram, url: ENVIRONMENT.INSTAGRAM_LINK },
];
