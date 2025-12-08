"use client";

import ClearCartModal from "components/ClearCartModal";
import { useUnAuthenticatedModal } from "components/modals/unauthenticated-action-modal";
import { set } from "date-fns";
import { calculateDiscountAmount } from "lib";
//
import { Product1, ProductVariant } from "models/Product.model";
import { CartItem, User1, UserCart } from "models/User.model";
import { useSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import SelfPickupInfoModal from "pages-sections/product-details/self-pickup-info-modal";
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
import { useLazyGetProductByIdQuery } from "services/product-api";
//
type ContextState = {
  handleFetch: () => void;
  handleAddToCart: (
    product: Product1,
    productVariant: ProductVariant,
    units: number,
    isOpenSelfPickClearInfo?: boolean
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
  removeVoucherDiscount: (voucherCode: string) => void;
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
  removeVoucherDiscount: () => {},
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
  const [openSelfPickClearCart, setOpenSelfPickClearCart] = useState(false);
  const [openOtherClearCart, setOpenOtherClearCart] = useState(false);
  const [openSelfPickClearInfo, setOpenSelfPickClearInfo] = useState(false);
  const [product, setProduct] = useState<Product1 | null>(null);
  const [productVariant, setProductVariant] = useState<ProductVariant | null>(
    null
  );
  const [units, setUnits] = useState<number>(null);
  const [fetchProduct, { isLoading: isLoadingProduct }] =
    useLazyGetProductByIdQuery();

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
  const removeVoucherDiscount = (voucherCode: string) => {
    setVoucherDiscounts((prvState) => {
      return prvState.filter(
        (voucherDiscount) => voucherDiscount.voucherCode != voucherCode
      );
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
      units: number,
      isOpenSelfPickClearInfo = true
    ) => {
      if (!user?.id || !user?.cart?.id) {
        openUnAuthenticatedModal(true);
        return;
      }
      if (cart.cartItems.length >= 10) {
        enqueueSnackbar(
          "You can only have up to 10 items in your cart. Please remove some items before adding new ones",
          {
            variant: "warning",
            autoHideDuration: 4000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          }
        );
        return;
      }
      if (!product.deliveryPartner) {
        const productData = await fetchProduct({
          productId: product.id,
        }).unwrap();
        product = productData?.data?.[0];
      }
      const {
        id: productId,
        images,
        maxPrice,
        minPrice,
        productType,
        brand,
        discountType,
        discountAmount,
        weight,
        deliveryPartner,
        name: productName,
      } = product;

      if (deliveryPartner === "SELF_PICKUP") {
        setProduct(product);
        setProductVariant(productVariant);
        setUnits(units);
        if (
          isItemInCart &&
          cart.cartItems.some((item) => item.deliveryPartner !== "SELF_PICKUP")
        ) {
          setOpenOtherClearCart(true);
          return;
        }
        if (isOpenSelfPickClearInfo) {
          setOpenSelfPickClearInfo(true);
          return;
        }
      } else {
        if (
          isItemInCart &&
          cart.cartItems.some((item) => item.deliveryPartner === "SELF_PICKUP")
        ) {
          setProduct(product);
          setProductVariant(productVariant);
          setUnits(units);
          setOpenSelfPickClearCart(true);
          return;
        }
      }
      const availableCartItem = isItemInCart(productVariant);
      //
      try {
        //
        if (availableCartItem) {
          if (availableCartItem?.units < productVariant?.units) {
            await handleUpdateQty(productVariant, units);
          }
          enqueueSnackbar("Item successfully added to your cart", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
          return;
        }
        setSelectedProductId(productVariant?.id);
        //
        const newItem: CartItem = {
          productId,
          maxPrice,
          minPrice,
          deliveryPartner,
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
        const response = await updateCart({
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
          shippingCost: (response as any)?.data?.shippingCost,
          cartItems: [...cart?.cartItems, newItem],
        }));
        enqueueSnackbar("Item successfully added to your cart", {
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
      handleUpdateQty,
      isItemInCart,
      openUnAuthenticatedModal,
      updateCart,
      user?.cart?.id,
      user?.id,
    ]
  );

  const submitCartItems = async () => {
    const {
      id: productId,
      images,
      maxPrice,
      minPrice,
      productType,
      brand,
      discountType,
      discountAmount,
      weight,
      deliveryPartner,
      name: productName,
    } = product;
    const availableCartItem = isItemInCart(productVariant);
    //
    try {
      //
      if (availableCartItem) {
        if (availableCartItem?.units < productVariant?.units) {
          await handleUpdateQty(productVariant, units);
        }
        enqueueSnackbar("Item successfully added to your cart", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
        return;
      }
      setSelectedProductId(productVariant?.id);
      //
      const newItem: CartItem = {
        productId,
        maxPrice,
        minPrice,
        deliveryPartner,
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
      const response = await updateCart({
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
        shippingCost: (response as any)?.data?.shippingCost,
        cartItems: [...cart?.cartItems, newItem],
      }));
      enqueueSnackbar("Item successfully added to your cart", {
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
      setProduct(null);
      setProductVariant(null);
      setUnits(null);
    }
  };

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

  const handleClearCartAndAdd = useCallback(async () => {
    setSelectedProductId(productVariant?.id);
    const {
      id: productId,
      images,
      minPrice,
      maxPrice,
      productType,
      brand,
      discountType,
      discountAmount,
      weight,
      deliveryPartner,
      name: productName,
    } = product;
    const newItem: CartItem = {
      productId,
      minPrice,
      maxPrice,
      deliveryPartner,
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
    try {
      await updateCart({
        userId: user?.id,
        cartId: user?.cart?.id,
        body: {
          cartItems: [{ productVariantId: productVariant?.id, units }],
        },
      });
      //
      setCart((prev) => ({
        ...prev,
        shippingCost: 0,
        cartItems: [newItem],
      }));
    } catch (error) {
      console.error(error);
    }
  }, [product, productVariant, units, updateCart, user?.cart?.id, user?.id]);

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
      isUpdating: isUpdating || isLoadingProduct,
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
      removeVoucherDiscount,
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
      increaseVoucherDiscount,
    ]
  );
  //
  return (
    <CartServiceContext.Provider value={returnValue}>
      {props.children}
      <ClearCartModal
        open={openSelfPickClearCart}
        onClose={() => setOpenSelfPickClearCart(false)}
        onClearCart={handleClearCartAndAdd}
        message="You cannot add a delivery item when your cart already contains 'Self Pickup' items!"
      />
      <ClearCartModal
        open={openOtherClearCart}
        onClose={() => setOpenOtherClearCart(false)}
        onClearCart={handleClearCartAndAdd}
        message="You cannot add a 'Self Pickup' item when your cart already contains other delivery items!"
      />
      <SelfPickupInfoModal
        open={openSelfPickClearInfo}
        onSubmit={submitCartItems}
        onClose={() => setOpenSelfPickClearInfo(false)}
        storeName={""}
        storeAddress={""}
      />
    </CartServiceContext.Provider>
  );
};
//
export default CartServiceProvider;
