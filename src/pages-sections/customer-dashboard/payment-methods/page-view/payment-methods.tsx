"use client";

import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import { Delete, Edit } from "@mui/icons-material";
import { Card, IconButton, Pagination } from "@mui/material";
// GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
import { H5, Paragraph } from "components/Typography";
// Local CUSTOM COMPONENT
import Header from "../header";
import TableRow from "../../address/table-row";

const PAYMENT_METHODS = [
  {
    id: "1050017AS",
    exp: "08 / 2022",
    payment_method: "Amex",
    card_no: "1234 **** **** ****",
  },
  {
    id: "1050017AS",
    exp: "10 / 2025",
    payment_method: "Mastercard",
    card_no: "1234 **** **** ****",
  },
  {
    id: "1050017AS",
    exp: "N/A",
    payment_method: "PayPal",
    card_no: "ui-lib@email.com",
  },
  {
    id: "1050017AS",
    exp: "08 / 2022",
    payment_method: "Visa",
    card_no: "1234 **** **** ****",
  },
];

const PaymentMethodsPageView = () => {
  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <Header title="Payment Methods" href="/payment-methods/add" buttonText="Add New" />

      {/* ALL PAYMENT LIST AREA */}
      {PAYMENT_METHODS.map((item, ind) => (
        <TableRow key={ind}>
          <FlexBox alignItems="center" gap={1}>
            <Card sx={{ width: 42, height: 28, borderRadius: 1 }}>
              <Image
                width={42}
                height={30}
                alt={item.payment_method}
                src={`/assets/images/payment-methods/${item.payment_method}.svg`}
              />
            </Card>

            <H5>Ralf Edward</H5>
          </FlexBox>

          <Paragraph>{item.card_no}</Paragraph>

          <Paragraph>{item.exp}</Paragraph>

          <Paragraph textAlign="center" color="grey.600">
            <IconButton LinkComponent={Link} href="/payment-methods/xkssThds6h37sd">
              <Edit fontSize="small" color="inherit" />
            </IconButton>

            <IconButton onClick={(e) => e.stopPropagation()}>
              <Delete fontSize="small" color="inherit" />
            </IconButton>
          </Paragraph>
        </TableRow>
      ))}

      {/* PAGINATION AREA */}
      <FlexBox justifyContent="center" mt={5}>
        <Pagination count={5} onChange={(data) => console.log(data)} />
      </FlexBox>
    </Fragment>
  );
};

export default PaymentMethodsPageView;
