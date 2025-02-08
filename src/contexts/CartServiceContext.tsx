"use client";

import { useUnAuthenticatedModal } from "components/modals/unauthenticated-action-modal";
import { calculateDiscountAmount } from "lib";
//
import { Product1, ProductVariant } from "models/Product.model";
import { CartItem, User1, UserCart } from "models/User.model";
import { useSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLazyGetCartQuery, useUpdateCartMutation } from "services/cart-api";
//
type ContextState = {
  handleFetch: () => void;
  handleAddToCart: (
    product: Product1,
    productVariant: ProductVariant,
    units: number
  ) => void;
  isCartFetching: boolean;
  cart: UserCart;
  setCart: Dispatch<SetStateAction<UserCart>>;
  isUpdating: boolean;
  handleRemoveFromCart: (productVariant: ProductVariant) => void;
  handleUpdateQty: (productVariant: ProductVariant, units: number) => void;
  length: number;
  isLoading: boolean;
  totalPrice: number;
  totalDiscount: number;
  isItemInCart: (productVariant: ProductVariant) => CartItem | null | undefined;
  selectedProductId: string;
  note: string;
  voucherDiscounts: {
    voucherCode: string;
    variantId: string;
    discount: number;
  }[];
  increaseVoucherDiscount: (
    voucherCode: string,
    variantId: string,
    discount: number
  ) => void;
  setNote: Dispatch<SetStateAction<string>>;
};
//
const initState: ContextState = {
  handleFetch: () => {},
  handleAddToCart: () => {},
  isCartFetching: false,
  cart: {
    id: "",
    cartItems: [],
  },
  setCart: () => {},
  isUpdating: false,
  handleRemoveFromCart: () => {},
  handleUpdateQty: () => {},
  length: 0,
  isLoading: false,
  totalPrice: 0,
  totalDiscount: 0,
  isItemInCart: () => null,
  selectedProductId: "",
  note: "",
  voucherDiscounts: null,
  setNote: () => {},
  increaseVoucherDiscount: () => {},
};
//
export const CartServiceContext = createContext<ContextState>(initState);
//
type Props = {
  children: ReactNode;
};
//
const CartServiceProvider = (props: Props) => {
  const session = useSession();
  const user = session?.data?.user as User1 | undefined;
  const { setIsOpen: openUnAuthenticatedModal } = useUnAuthenticatedModal();
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const [cart, setCart] = useState<UserCart>({
    id: "",
    cartItems: [],
  });
  const [voucherDiscounts, setVoucherDiscounts] = useState<
    { voucherCode: string; variantId: string; discount: number }[]
  >([]);
  const [updateCart, { isLoading: isUpdating }] = useUpdateCartMutation();
  const [fetchCart, { isLoading: isCartFetching }] = useLazyGetCartQuery();
  //
  const increaseVoucherDiscount = (
    voucherCode: string,
    variantId: string,
    discount: number
  ) => {
    if (
      voucherDiscounts.length > 0 &&
      voucherDiscounts.some((e) => e.variantId === variantId)
    ) {
      throw Error("This voucher already use in this order!");
    }
    setVoucherDiscounts((prvState) => {
      return [...prvState, { voucherCode, variantId, discount }];
    });
  };

  //
  const handleFetch = useCallback(async () => {
    if (!user?.id || !user?.cart?.id) {
      return;
    }
    try {
      const res = await fetchCart({
        userId: user?.id,
        cartId: user?.cart?.id,
      });
      //
      if (res?.data) setCart(res?.data);
    } catch (error) {
      console.error(error);
    }
  }, [fetchCart, user?.cart?.id, user?.id]);
  //
  useEffect(() => {
    if (user?.id && user?.cart?.id) {
      handleFetch();
    }
  }, [handleFetch, user?.cart?.id, user?.id]);
  //
  const handleUpdateQty = useCallback(
    async (productVariant: ProductVariant, units: number) => {
      if (!user?.id) {
        openUnAuthenticatedModal(true);
        return;
      }
      setSelectedProductId(productVariant?.id);
      //
      const newCartList = cart?.cartItems?.map((item) =>
        item?.productVariant?.id === productVariant?.id
          ? { ...item, units: item?.units + units }
          : { ...item }
      );
      //
      try {
        const cart = await updateCart({
          userId: user?.id,
          cartId: user?.cart?.id,
          body: {
            cartItems: newCartList?.map((item) => ({
              units: item?.units,
              productVariantId: item?.productVariant?.id,
            })),
          },
        });
        setCart((prev) => ({
          ...prev,
          // shippingCost:cart?.shippingCost,
          cartItems: newCartList,
        }));
      } catch (error) {
        console.error(error);
      } finally {
        setSelectedProductId("");
      }
    },
    [
      cart?.cartItems,
      openUnAuthenticatedModal,
      updateCart,
      user?.cart?.id,
      user?.id,
    ]
  );
  //
  const isItemInCart = useCallback(
    (productVariant: ProductVariant) =>
      cart?.cartItems?.find(
        (item) => item?.productVariant?.id === productVariant?.id
      ),
    [cart?.cartItems]
  );
  //
  const handleAddToCart = useCallback(
    async (
      product: Product1,
      productVariant: ProductVariant,
      units: number
    ) => {
      const {
        id: productId,
        images,
        basePrice,
        productType,
        brand,
        discountType,
        discountAmount,
        weight,
        name: productName,
      } = product;

      if (!user?.id || !user?.cart?.id) {
        openUnAuthenticatedModal(true);
        return;
      }
      //
      const availableCartItem = isItemInCart(productVariant);
      //
      try {
        //
        if (availableCartItem) {
          if (availableCartItem?.units < productVariant?.units) {
            await handleUpdateQty(productVariant, units);
          }
          return;
        }
        setSelectedProductId(productVariant?.id);
        //
        const newItem: CartItem = {
          productId,
          basePrice,
          images,
          productVariant,
          units,
          productName,
          brand,
          productType,
          weight,
          discountAmount,
          discountType,
        };
        //
        await updateCart({
          userId: user?.id,
          cartId: user?.cart?.id,
          body: {
            cartItems: [...cart?.cartItems, newItem]?.map((item) => ({
              units: item?.units,
              productVariantId: item?.productVariant?.id,
            })),
          },
        });
        //
        setCart((prev) => ({
          ...prev,
          cartItems: [...cart?.cartItems, newItem],
        }));
      } catch (error) {
        console.error(error);
      } finally {
        setSelectedProductId("");
      }
    },
    [
      cart?.cartItems,
      handleUpdateQty,
      isItemInCart,
      openUnAuthenticatedModal,
      updateCart,
      user?.cart?.id,
      user?.id,
    ]
  );
  //
  const handleRemoveFromCart = useCallback(
    async (productVariant: ProductVariant) => {
      if (!user?.id || !user?.cart?.id) {
        openUnAuthenticatedModal(true);
        return;
      }
      setSelectedProductId(productVariant?.id);
      try {
        const res = await updateCart({
          userId: user?.id,
          cartId: user?.cart?.id,
          body: {
            cartItems: cart?.cartItems
              .filter((item) => item?.productVariant?.id !== productVariant?.id)
              .map((item) => ({
                units: item?.units,
                productVariantId: item?.productVariant?.id,
              })),
          },
        });
        //
        setCart((prev) => ({
          ...prev,
          shippingCost: (res as any)?.data?.shippingCost,
          cartItems: prev?.cartItems?.filter(
            (item) => item?.productVariant?.id !== productVariant?.id
          ),
        }));
        enqueueSnackbar("Item successfully removed from your cart", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      } catch (error) {
        console.error(error);
      } finally {
        setSelectedProductId("");
      }
    },
    [
      cart?.cartItems,
      openUnAuthenticatedModal,
      updateCart,
      user?.cart?.id,
      user?.id,
    ]
  );
  //
  const totalPrice = useMemo(
    () =>
      cart?.cartItems?.reduce(
        (accumulator, current) =>
          (accumulator =
            accumulator + current?.productVariant?.price * current?.units),
        0
      ),
    [cart?.cartItems]
  );

  const totalDiscount = useMemo(() => {
    const sumOfDiscount = cart?.cartItems?.reduce(
      (accumulator, current) =>
        (accumulator =
          accumulator +
          calculateDiscountAmount(
            current?.discountType,
            current?.productVariant.price,
            current?.discountAmount
          ) *
            current?.units),
      0
    );
    const discount =
      sumOfDiscount +
      voucherDiscounts?.reduce(
        (accumulator, current) =>
          (accumulator = accumulator + current.discount),
        0
      );
    return discount < totalPrice ? discount : totalPrice;
  }, [cart?.cartItems, totalPrice, voucherDiscounts]);
  //
  const returnValue: ContextState = useMemo(
    () => ({
      handleFetch,
      handleAddToCart,
      isCartFetching,
      cart,
      setCart,
      isUpdating,
      handleRemoveFromCart,
      handleUpdateQty,
      length: cart?.cartItems?.length,
      isLoading: isUpdating || isCartFetching,
      totalPrice,
      totalDiscount,
      isItemInCart,
      selectedProductId,
      note,
      setNote,
      voucherDiscounts,
      increaseVoucherDiscount,
    }),
    [
      handleFetch,
      handleAddToCart,
      isCartFetching,
      cart,
      isUpdating,
      handleRemoveFromCart,
      handleUpdateQty,
      totalPrice,
      totalDiscount,
      isItemInCart,
      selectedProductId,
      note,
      voucherDiscounts,
    ]
  );
  //
  return (
    <CartServiceContext.Provider value={returnValue}>
      {props.children}
    </CartServiceContext.Provider>
  );
};
//
export default CartServiceProvider;
