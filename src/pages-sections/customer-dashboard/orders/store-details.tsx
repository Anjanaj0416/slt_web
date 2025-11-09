import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Link,
  Box,
  CircularProgress,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { useListStoreQuery } from "services/store-api";

const getMapUrl = (location: { lat: string; lng: string }) => {
  try {
    // parse string into object
    const { lat, lng } = location;
    if (lat && lng) {
      return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    }
  } catch (e) {
    console.error("Invalid location JSON:", e);
  }
  return null; // fallback if invalid
};

export type StoreDetailsProps = {
  productId: string;

};

export default function StoreDetails({ productId }: StoreDetailsProps) {
  const { data, error, isLoading } = useListStoreQuery({
    page: 0,
    size: 1,
    productId,
  });
  const store = data?.data?.[0];
  //
  const handleOpen = () => {
    window.open(
      getMapUrl(JSON.parse(store?.location)),
      "_blank",
      "noopener,noreferrer"
    );
  };
  //
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="200px"
      >
        <CircularProgress />
      </Box>
    );
  }
  if (!store || error) {
    return <></>;
  }
  return (
    <Card sx={{ borderRadius: 2, p: 2, maxWidth: 400 }}>
      <CardContent>
        <Stack spacing={1}>
          <Typography fontSize={16} fontWeight="bold">
            Pickup Location Details
          </Typography>
          <Typography fontWeight="semi-bold">{store?.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {store?.address}
          </Typography>
          {store?.telephone && (
            <Stack direction="row" spacing={1} alignItems="center">
              <PhoneIcon fontSize="small" />
              <Link href={`tel:${store?.telephone}`} underline="hover">
                {store?.telephone}
              </Link>
            </Stack>
          )}
          {store?.email && (
            <Stack direction="row" spacing={1} alignItems="center">
              <EmailIcon fontSize="small" />
              <Link href={`mailto:${store?.email}`} underline="hover">
                {store?.email}
              </Link>
            </Stack>
          )}
          <Button
            variant="contained"
            startIcon={<PlaceIcon />}
            onClick={handleOpen}
          >
            Open Location
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

/*
USAGE:
<StoreDetails
  name="Tech World - Ratnapura"
  address="77/B1 Pallebedda, Ratnapura, Sri Lanka"
  contact="+94 77 659 1828"
  email="info@techworld.lk"
/>
*/
