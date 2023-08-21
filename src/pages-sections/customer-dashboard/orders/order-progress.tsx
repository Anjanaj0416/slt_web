import { Fragment } from "react";
import Done from "@mui/icons-material/Done";
import { Avatar, Box, Card, styled } from "@mui/material";
// CUSTOM ICON COMPONENTS
import Delivery from "icons/Delivery";
import PackageBox from "icons/PackageBox";
import TruckFilled from "icons/TruckFilled";
// GLOBAL CUSTOM COMPONENTS
import { Paragraph } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";

// STYLED COMPONENT
const StyledFlexbox = styled(FlexBetween)(({ theme }) => ({
  flexWrap: "wrap",
  marginTop: "2rem",
  marginBottom: "2rem",
  [theme.breakpoints.down("sm")]: { flexDirection: "column" },
  "& .line": {
    height: 4,
    minWidth: 50,
    flex: "1 1 0",
    [theme.breakpoints.down("sm")]: { flex: "unset", height: 50, minWidth: 4 },
  },
}));

const OrderProgress = () => {
  const ORDER_STATUS = "Shipping";
  const STEP_ICONS = [PackageBox, TruckFilled, Delivery];
  const ORDER_STATUS_LIST = ["Packaging", "Shipping", "Delivering", "Complete"];

  const statusIndex = ORDER_STATUS_LIST.indexOf(ORDER_STATUS);

  return (
    <Card sx={{ p: "2rem 1.5rem", mb: 4 }}>
      <StyledFlexbox>
        {STEP_ICONS.map((Icon, ind) => (
          <Fragment key={ind}>
            <Box position="relative">
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  color: ind <= statusIndex ? "white" : "primary.main",
                  bgcolor: ind <= statusIndex ? "primary.main" : "grey.300",
                }}
              >
                <Icon color="inherit" fontSize="large" />
              </Avatar>

              {ind < statusIndex ? (
                <Avatar
                  sx={{
                    top: -5,
                    right: -5,
                    width: 22,
                    height: 22,
                    bgcolor: "grey.200",
                    position: "absolute",
                    color: "success.main",
                  }}
                >
                  <Done color="inherit" sx={{ fontSize: 16 }} />
                </Avatar>
              ) : null}
            </Box>

            {ind < STEP_ICONS.length - 1 ? (
              <Box className="line" bgcolor={ind < statusIndex ? "primary.main" : "grey.300"} />
            ) : null}
          </Fragment>
        ))}
      </StyledFlexbox>

      <FlexBox justifyContent={{ xs: "center", sm: "flex-end" }}>
        <Paragraph
          p="0.5rem 1rem"
          textAlign="center"
          borderRadius="300px"
          color="primary.main"
          bgcolor="primary.light"
        >
          Estimated Delivery Date <b>4th October</b>
        </Paragraph>
      </FlexBox>
    </Card>
  );
};

export default OrderProgress;
