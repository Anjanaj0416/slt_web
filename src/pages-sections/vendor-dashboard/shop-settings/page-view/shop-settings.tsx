"use client";

import { Box, Button, Card, Divider } from "@mui/material";
// GLOBAL CUSTOM COMPONENTS
import { H3, Paragraph } from "components/Typography";
// Local CUSTOM COMPONENT
import SettingsForm from "../settings-form";
import PageSettings from "../page-settings";

const ShopSettingsPageView = () => {
  return (
    <Box py={4} maxWidth={740} margin="auto">
      <H3 mb={2}>Shop Settings</H3>

      <Card sx={{ p: 3 }}>
        {/* BASIC SETTING SECTION */}
        <Paragraph fontWeight={700} mb={4}>
          Basic Settings
        </Paragraph>

        <SettingsForm />

        <Divider sx={{ my: 4 }} />

        {/* SHOP SETTING SECTION */}
        <Paragraph fontWeight={700} mb={2}>
          Shop Page Settings
        </Paragraph>

        <PageSettings />

        <Button color="info" variant="contained">
          Save Changes
        </Button>
      </Card>
    </Box>
  );
};

export default ShopSettingsPageView;
