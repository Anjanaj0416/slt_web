"use client";

import { Fragment, useState } from "react";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
// Local CUSTOM COMPONENTS
import OrderSummery from "../order-summery";
import OrderProgress from "../order-progress";
import OrderedProducts from "../ordered-products";
import DashboardHeader from "../../dashboard-header";
// CUSTOM DATA MODEL
import { Order1 } from "models/Order.model";
import useBuyNowItemService from "hooks/useBuyNowItemService";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useUpdateOrderMutation } from "services/order-api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { isSelfPickupPackage } from "lib";

// =============================================================
type Props = { order: Order1 };
// =============================================================

const OrderDetailsPageView = ({ order }: Props) => {
  const { handleAddToItem } = useBuyNowItemService();
  const [open, setOpen] = useState(false);
  const session = useSession();
  const user = session?.data?.user;
  const [updateOrder, { isLoading: isUpdatingOrder }] =
    useUpdateOrderMutation();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    setOpen(false);
    try {
      await updateOrder({
        userId: (user as any).id,
        id: order.id,
        body: { status: "CANCELLED" },
      });
      enqueueSnackbar("Order cancellation successful!", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      window.location.href = window.location.origin + "/orders";
    } catch (e) {}
  };
  const handleReOrder = () => {
    const items = [];
    order.packages.forEach((pkg) => {
      pkg.packageItems.forEach((pkgItem) => {
        const {
          productVariant,
          units,
          price,
          productId,
          productName,
          images,
          basePrice,
          brand,
          productDiscountAmount,
          productDiscountType,
        } = pkgItem;
        const product = {
          id: productId,
          images,
          basePrice,
          brand,
          price,
          discountType: productDiscountType,
          discountAmount: productDiscountAmount,
          name: productName,
        };
        items.push({ product, productVariant, units });
      });
    });
    handleAddToItem(items);
  };
  return (
    <Fragment>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="confirmation-dialog-title"
          aria-describedby="confirmation-dialog-description"
        >
          <DialogTitle id="confirmation-dialog-title">
            Confirm Order Cancellation
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="confirmation-dialog-description">
              Are you sure you want to cancel order?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirm} color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {/* TITLE HEADER AREA */}
      <DashboardHeader
        onClick={handleReOrder}
        Icon={ShoppingBag}
        title={"Order Details"}
        buttonText="Order Again"
      />

      {/* ORDER PROGRESS AREA */}
      {order.status === "SUCCESS" &&
        order.packages.length === 1 &&
        order.packages[0].status !== "CANCELLED" &&
        !isSelfPickupPackage(order.packages?.[0]) && (
          <OrderProgress
            status={order.packages[0].status}
            handleOpen={handleOpen}
            isUpdating={isUpdatingOrder}
          />
        )}

      {/* ORDERED PRODUCT LIST */}
      <OrderedProducts order={order} />

      {/* SHIPPING AND ORDER SUMMERY */}
      <OrderSummery order={order} />
    </Fragment>
  );
};

export default OrderDetailsPageView;
