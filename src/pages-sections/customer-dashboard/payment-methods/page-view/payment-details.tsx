"use client";

import { Fragment } from "react";
import CreditCard from "@mui/icons-material/CreditCard";
// GLOBAL CUSTOM COMPONENTS
import Card1 from "components/Card1";
// Local CUSTOM COMPONENT
import PaymentForm from "../payment-form";
import DashboardHeader from "../../dashboard-header";

const PaymentDetailsPageView = () => {
  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader
        title="Add New"
        Icon={CreditCard}
        href="/payment-methods"
        buttonText="Back Payment Methods"
      />

      {/* PAYMENT DETAILS EDIT FORM */}
      <Card1>
        <PaymentForm />
      </Card1>
    </Fragment>
  );
};

export default PaymentDetailsPageView;
