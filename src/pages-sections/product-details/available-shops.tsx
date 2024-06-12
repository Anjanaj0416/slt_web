"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
// GLOBAL CUSTOM COMPONENTS
import { H3, H4 } from "components/Typography";
import { FlexRowCenter } from "components/flex-box";
import Store from "models/Store.model";
import ENVIRONMENT from "config/environment";

type Props = {
  stores: Store[];
};
const AvailableShops = ({ stores }: Props) => {
  return (
    <Box mb={7.5}>
      <H3 mb={3}>Also Available at</H3>

      <Grid container spacing={4}>
        {stores.map((item) => (
          <Grid item lg={2} md={3} sm={4} xs={12} key={item.name}>
            <Link href="/shops/scarlett-beauty">
              <FlexRowCenter
                p={3.25}
                width="100%"
                component={Card}
                flexDirection="column"
              >
                <Avatar
                  alt={item.name}
                  src={`${ENVIRONMENT.S3_BUCKET_URL}/${item.logoFilePath}`}
                  sx={{ width: 48, height: 48 }}
                />
                <H4 mt={1.5} color="grey.800">
                  {item.name.length > 10 ? `${item.name.substring(0,7)}...` : item.name}
                </H4>
              </FlexRowCenter>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AvailableShops;
