import { FC } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import format from "date-fns/format";
// GLOBAL CUSTOM COMPONENTS
import {  H6, Paragraph } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// CUSTOM DATA MODEL
import { Order1 } from "models/Order.model";
import { ENVIRONMENT } from "config";
import { PackageItem } from "models/Package.model";
import { Box, Typography } from "@mui/material";
import OrderProgress from "./order-progress";

// ==============================================================
type Props = { order: Order1 };
// ==============================================================

const OrderedProducts: FC<Props> = ({ order }) => {
  console.log(order);

  const { id, createdAt, packages } = order || {};
  console.log(createdAt);

  return (
    <Card sx={{ p: 0, mb: "30px" }}>
      <FlexBetween px={3} py={2} flexWrap="wrap" bgcolor="grey.200">
        <Item title="Order ID:" value={id} />
        <Item
          title="Placed on:"
          value={format(new Date(createdAt), "dd MMM, yyyy")}
        />
        <Item title="Delivered on:" value={"None"} />
      </FlexBetween>

      {packages.length > 1
        ? packages.map((pkg, index) => (
            <Box
              key={pkg.id}
              sx={{
                border: "1px solid",
                borderColor: "secondary.100",
                marginTop: 2,
                marginBottom: index === packages.length - 1 ? 1 : 3,
                padding: 1,
                borderRadius: "8px",
                marginX: 1,
              }}
            >
              <Typography
                marginBottom={2}
                marginTop={1}
                marginLeft={2}
                color="#7D879C"
              >{`Package ID: ${pkg.id}`}</Typography>
              {order.status === "SUCCESS" && (
                <Box paddingBottom={1}>
                  <OrderProgress status={pkg.status} />
                </Box>
              )}
              {pkg.packageItems.map((item, ind) => buildProductList(ind, item))}
            </Box>
          ))
        : packages[0].packageItems.map((item, ind) =>
            buildProductList(ind, item)
          )}
    </Card>
  );

  function buildProductList(ind: number, item: PackageItem) {
    return (
      <FlexBetween px={2} py={1} flexWrap="wrap" key={ind}>
        <FlexBox gap={2.5} alignItems="center">
          <Avatar
            alt={item.product.name}
            src={
              item.product.images?.[0]
                ? `${ENVIRONMENT.S3_BUCKET_URL}/${item.product.images?.[0]}`
                : `${ENVIRONMENT.APP_URL}/assets/images/default-product.jpg`
            }
            sx={{ height: 64, width: 64 }}
          />

          <div>
            <H6>{item.product.name}</H6>
            <Paragraph color="grey.600">
              {currency(item.product.price)} x {item.units}
            </Paragraph>
          </div>
        </FlexBox>

        <Paragraph color="grey.600" ellipsis>
          Brand: {item.product.brand}
        </Paragraph>

        <Button
          disabled={item.status !== "DELIVERED"}
          variant="text"
          color="primary"
        >
          Write a Review
        </Button>
      </FlexBetween>
    );
  }
};

function Item({ title, value }: { title: string; value: string }) {
  return (
    <FlexBox gap={1} alignItems="center">
      <Paragraph color="grey.600">{title}</Paragraph>
      <Paragraph>{value}</Paragraph>
    </FlexBox>
  );
}

export default OrderedProducts;
