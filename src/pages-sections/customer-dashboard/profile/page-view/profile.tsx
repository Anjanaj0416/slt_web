"use client";

import Link from "next/link";
import { Fragment } from "react";
import format from "date-fns/format";
import Person from "@mui/icons-material/Person";
import { Avatar, Box, Button, Card, Grid, Theme, useMediaQuery } from "@mui/material";
// GLOBAL CUSTOM COMPONENTS
import TableRow from "components/TableRow";
import { FlexBetween, FlexBox } from "components/flex-box";
import { H3, H5, Paragraph, Small } from "components/Typography";
import { Navigation } from "components/layouts/customer-dashboard-layout";
// Local CUSTOM COMPONENT
import DashboardHeader from "../../dashboard-header";
// API FUNCTION
import { currency } from "lib";
// CUSTOM DATA MODEL
import User from "models/User.model";

// ============================================================
type Props = { user: User };
// ============================================================

const ProfilePageView = ({ user }: Props) => {
  const downMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  // SECTION TITLE HEADER LINK
  const HEADER_LINK = (
    <Button
      color="primary"
      LinkComponent={Link}
      href={`/profile/${user.id}`}
      sx={{ px: 4, bgcolor: "primary.light" }}
    >
      Edit Profile
    </Button>
  );

  const INFO_LIST = [
    { title: "16", subtitle: "All Orders" },
    { title: "02", subtitle: "Awaiting Payments" },
    { title: "00", subtitle: "Awaiting Shipment" },
    { title: "01", subtitle: "Awaiting Delivery" },
  ];

  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader
        Icon={Person}
        title="My Profile"
        button={HEADER_LINK}
        navigation={<Navigation />}
      />

      {/* USER PROFILE INFO */}
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <Card
            sx={{
              gap: 2,
              height: "100%",
              display: "flex",
              p: "1rem 1.5rem",
              alignItems: "center",
            }}
          >
            <Avatar src={user.avatar} sx={{ height: 64, width: 64 }} />

            <FlexBetween flexWrap="wrap" flex={1}>
              <Box>
                <H5>{`${user.name.firstName} ${user.name.lastName}`}</H5>

                <FlexBox alignItems="center" gap={1}>
                  <Paragraph color="grey.600">Balance:</Paragraph>
                  <Paragraph color="primary.main">{currency(500)}</Paragraph>
                </FlexBox>
              </Box>

              <Paragraph color="grey.600" letterSpacing={3}>
                SILVER USER
              </Paragraph>
            </FlexBetween>
          </Card>
        </Grid>

        <Grid item container spacing={3} md={6} xs={12}>
          {INFO_LIST.map((item) => (
            <Grid item lg={3} sm={6} xs={6} key={item.subtitle}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  p: "1rem 1.25rem",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <H3 color="primary.main" my={0} fontWeight={600}>
                  {item.title}
                </H3>

                <Small color="grey.600" textAlign="center">
                  {item.subtitle}
                </Small>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <TableRow
        sx={{
          mt: 3,
          cursor: "auto",
          p: "0.75rem 1.5rem",
          ...(downMd && {
            alignItems: "start",
            flexDirection: "column",
            justifyContent: "flex-start",
          }),
        }}
      >
        <TableRowItem title="First Name" value={user.name.firstName} />
        <TableRowItem title="Last Name" value={user.name.lastName} />
        <TableRowItem title="Email" value={user.email} />
        <TableRowItem title="Phone" value={user.phone} />
        <TableRowItem
          title="Birth date"
          value={format(new Date(user.dateOfBirth), "dd MMM, yyyy")}
        />
      </TableRow>
    </Fragment>
  );
};

const TableRowItem = ({ title, value }) => {
  return (
    <FlexBox flexDirection="column" p={1}>
      <Small color="grey.600" mb={0.5} textAlign="left">
        {title}
      </Small>
      <span>{value}</span>
    </FlexBox>
  );
};

export default ProfilePageView;
