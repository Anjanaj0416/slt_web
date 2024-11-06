"use client";
import { useUnAuthenticatedModal } from "components/modals/unauthenticated-action-modal";
import { calculateDiscountAmount } from "lib";
//
import { Product1 } from "models/Product.model";
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
  handleAddToCart: (product: Product1, units: number) => void;
  isCartFetching: boolean;
  cart: UserCart;
  setCart: Dispatch<SetStateAction<UserCart>>;
  isUpdating: boolean;
  handleRemoveFromCart: (product: Product1) => void;
  handleUpdateQty: (product: Product1, units: number) => void;
  length: number;
  isLoading: boolean;
  totalPrice: number;
  totalDiscount: number;
  isItemInCart: (product: Product1) => CartItem | null | undefined;
  selectedProductId: string;
  note: string;
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
  setNote: () => {},
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
  const [updateCart, { isLoading: isUpdating }] = useUpdateCartMutation();
  const [fetchCart, { isLoading: isCartFetching }] = useLazyGetCartQuery();
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
    async (product: Product1, units: number) => {
      if (!user?.id) {
        openUnAuthenticatedModal(true);
        return;
      }
      setSelectedProductId(product?.id);
      //
      const newCartList = cart?.cartItems?.map((item) =>
        item?.product?.id === product?.id
          ? { ...item, units: item?.units + units }
          : { ...item }
      );
      //
      try {
        await updateCart({
          userId: user?.id,
          cartId: user?.cart?.id,
          body: {
            cartItems: newCartList?.map((item) => ({
              units: item?.units,
              productId: item?.product?.id,
            })),
          },
        });
        setCart((prev) => ({
          ...prev,
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
    (product: Product1) =>
      cart?.cartItems?.find((item) => item?.product?.id === product?.id),
    [cart?.cartItems]
  );
  //
  const handleAddToCart = useCallback(
    async (product: Product1, units: number) => {
      if (!user?.id || !user?.cart?.id) {
        openUnAuthenticatedModal(true);
        return;
      }
      //
      const availableCartItem = isItemInCart(product);
      //
      try {
        //
        if (availableCartItem) {
          if (availableCartItem?.units < product?.units) {
            await handleUpdateQty(product, units);
          }
          return;
        }
        setSelectedProductId(product?.id);
        //
        const newItem: CartItem = {
          product,
          units,
        };
        //
        await updateCart({
          userId: user?.id,
          cartId: user?.cart?.id,
          body: {
            cartItems: [...cart?.cartItems, newItem]?.map((item) => ({
              units: item?.units,
              productId: item?.product?.id,
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
    async (product: Product1) => {
      if (!user?.id || !user?.cart?.id) {
        openUnAuthenticatedModal(true);
        return;
      }
      setSelectedProductId(product?.id);
      try {
        await updateCart({
          userId: user?.id,
          cartId: user?.cart?.id,
          body: {
            cartItems: cart?.cartItems
              .filter((item) => item?.product?.id !== product?.id)
              .map((item) => ({
                units: item?.units,
                productId: item?.product?.id,
              })),
          },
        });
        //
        setCart((prev) => ({
          ...prev,
          cartItems: prev?.cartItems?.filter(
            (item) => item?.product?.id !== product?.id
          ),
        }));
        enqueueSnackbar(
          `${product?.name} successfully removed from your cart`,
          {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          }
        );
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
            accumulator + current?.product?.basePrice * current?.units),
        0
      ),
    [cart?.cartItems]
  );

  const totalDiscount = useMemo(
    () =>
      cart?.cartItems?.reduce(
        (accumulator, current) =>
          (accumulator =
            accumulator +
            calculateDiscountAmount(
              current?.product?.discountType,
              current?.product?.basePrice,
              current?.product?.discountAmount
            ) *
              current?.units),
        0
      ),
    [cart?.cartItems]
  );
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
    }),
    [
      cart,
      handleAddToCart,
      handleFetch,
      handleRemoveFromCart,
      handleUpdateQty,
      isCartFetching,
      isItemInCart,
      isUpdating,
      totalPrice,
      selectedProductId,
      note,
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
