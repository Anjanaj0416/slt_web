import Link from "next/link";
import { FC, useState } from "react";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
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
import { StyledRoot } from "./styles";
import { ENVIRONMENT } from "config";
import { Box } from "@mui/material";
import API from "constants/settings";
import { cachedRequest } from "utils/request";
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
    >
      <Box
        sx={{
          gap: 2,
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
                fontSize: "14px",
                fontWeight: 500,
                animation: "scroll 20s linear infinite",
              }}
            >
              <FlexBetween gap={24}>
                <Box>
                  {marqueeSettings?.title ||
                    "www.tradez.lk - An Emerging Digital Marketplace in Sri Lanka"}
                </Box>
                <Box>
                  {marqueeSettings?.title ||
                    "www.tradez.lk - An Emerging Digital Marketplace in Sri Lanka"}
                </Box>
                <Box>
                  {marqueeSettings?.title ||
                    "www.tradez.lk - An Emerging Digital Marketplace in Sri Lanka"}
                </Box>
                <Box>
                  {marqueeSettings?.title ||
                    "www.tradez.lk - An Emerging Digital Marketplace in Sri Lanka"}
                </Box>

                <Box>{marqueeSettings?.title}</Box>
              </FlexBetween>
            </Box>
            <style jsx>{`
              @keyframes scroll {
                0% {
                  transform: translateX(0%);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
            `}</style>
          </Box>
        )}
      </Box>
    </StyledRoot>
  );
};

export default Topbar;
