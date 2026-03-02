"use client";

import Banner from "models/Banner.model";
import Link from "next/link";
import MobileBannerCard from "./mobile-banner-card";
import ENVIRONMENT from "config/environment";
import { FlexBetween } from "components/flex-box";

type Props = { topBanners: Banner[] };
const MobileBannerSection = ({ topBanners }: Props) => {
  return (
    <FlexBetween
      mb={{ xs: 3, md: 4 }}
      sx={{
        display: { xs: "flex", lg: "none" },
        gap: 1,
      }}
    >
      {topBanners.map((banner) => (
        <Link key={banner.id} href={banner.link} style={{ flex: 1 }}>
          <MobileBannerCard
            imageFull
            img={`${ENVIRONMENT.S3_BUCKET_URL}/${banner.imageUrl}`}
            sx={{ width: "100%" }}
          />
        </Link>
      ))}
    </FlexBetween>
  );
};

export default MobileBannerSection;
