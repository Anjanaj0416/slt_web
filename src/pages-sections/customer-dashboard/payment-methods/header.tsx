import { FC } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import CreditCard from "@mui/icons-material/CreditCard";
// Local CUSTOM COMPONENT
import DashboardHeader from "../dashboard-header";
// GLOBAL CUSTOM COMPONENT
import { Navigation } from "components/layouts/customer-dashboard-layout";

// ==============================================================
interface Props {
  href: string;
  title: string;
  buttonText: string;
}
// ==============================================================

const Header: FC<Props> = ({ title, href, buttonText }) => {
  const HEADER_LINK = (
    <Button
      href={href}
      color="primary"
      LinkComponent={Link}
      sx={{ bgcolor: "primary.light", px: 4 }}
    >
      {buttonText}
    </Button>
  );

  return (
    <DashboardHeader
      title={title}
      Icon={CreditCard}
      button={HEADER_LINK}
      navigation={<Navigation />}
    />
  );
};

export default Header;
