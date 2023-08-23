"use client";

import { FC, PropsWithChildren } from "react";
import Container from "@mui/material/Container";
// LOCAL CUSTOM COMPONENTS
import BodyWrapper from "./dashboard-body-wrapper";
import DashboardNavbar from "./dashboard-navbar/dashboard-navbar";
import DashboardSidebar from "./dashboard-sidebar/dashboard-sidebar";
// LOCAL LAYOUT CONTEXT PROVIDER
import { LayoutProvider } from "./dashboard-layout-context";

const VendorDashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <LayoutProvider>
      <DashboardSidebar />

      <BodyWrapper>
        <DashboardNavbar />
        <Container maxWidth="lg">{children}</Container>
      </BodyWrapper>
    </LayoutProvider>
  );
};

export default VendorDashboardLayout;
