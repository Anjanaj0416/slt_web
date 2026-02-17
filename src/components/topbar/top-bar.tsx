import { FC } from "react";
import { FlexBetween } from "components/flex-box";
// STYLED COMPONENTS
import { StyledRoot } from "./styles";
import { Box } from "@mui/material";
import Marquee from "react-fast-marquee";

import { useGetSettingsQuery } from "services/setting-api";

// ===========================================
type Props = { bgColor?: string };
// ===========================================

const Topbar: FC<Props> = ({ bgColor }) => {
  const { data, isLoading } = useGetSettingsQuery({});
  const marqueeSettings = data?.Marquee;
  return (
    <StyledRoot
      bgColor={marqueeSettings?.backgroundColor || bgColor}
      expand={1}
      sx={{ maxHeight: { xs: "40px", md: "50px" } }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* <Chip
              label={"HOT"}
              size="small"
              sx={{
                color: "white",
                fontWeight: 700,
                backgroundColor: "primary.main",
                "& .MuiChip-label": { pl: ".8rem", pr: ".8rem" },
              }}
            /> */}
        {!isLoading && (
          <Box
            className="title"
            sx={{
              color: marqueeSettings?.textColor || "#ffffff",

              width: "100%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              display: "block",
            }}
          >
            <Box
              component="span"
              sx={{
                display: "inline-block",
                fontWeight: 500,
              }}
            >
              <FlexBetween gap={24}>
                <Marquee autoFill>
                  <Box pl={12} sx={{ fontSize: { xs: "12px", md: "14px" } }}>
                    {marqueeSettings?.title ||
                      "www.tradez.lk - An Emerging Digital Marketplace in Sri Lanka"}
                  </Box>{" "}
                </Marquee>

                <Box>{marqueeSettings?.title}</Box>
              </FlexBetween>
            </Box>
            {/* <style jsx>{`
              @keyframes scroll {
                0% {
                  transform: translateX(0%);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
            `}</style> */}
          </Box>
        )}
      </Box>
    </StyledRoot>
  );
};

export default Topbar;
