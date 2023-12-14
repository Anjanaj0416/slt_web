/**
 * .env file related keys are defined here
 */

// =========================================================
type Environment = {
  BASE_URL: string;
  FACEBOOK_LINK: string;
  TWITTER_LINK: string;
  INSTAGRAM_LINK: string;
  S3_BUCKET_URL: string;
};
// =========================================================

const ENVIRONMENT: Environment = {
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  FACEBOOK_LINK: process.env.NEXT_PUBLIC_FACEBOOK_LINK,
  TWITTER_LINK: process.env.NEXT_PUBLIC_TWITTER_LINK,
  INSTAGRAM_LINK: process.env.NEXT_PUBLIC_INSTAGRAM_LINK,
  S3_BUCKET_URL: process.env.NEXT_PUBLIC_S3_BUCKET_URL,
};
//
export default ENVIRONMENT;
