"use client";
import { useUnAuthenticatedModal } from "components/modals/unauthenticated-action-modal";
//
import { Product1 } from "models/Product.model";
import { CartItem, User1, UserCart } from "models/User.model";
import { useSession } from "next-auth/react";
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
  //
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
      if (res.data) setCart(res.data);
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
      const newCartList = cart.cartItems.map((item) =>
        item.product.id === product.id
          ? { ...item, units: item.units + units }
          : { ...item }
      );
      try {
        await updateCart({
          userId: user?.id,
          cartId: user?.cart?.id,
          body: {
            cartItems: newCartList.map((item) => ({
              units: item.units,
              productId: item.product.id,
            })),
          },
        });
        setCart((prev) => ({
          ...prev,
          cartItems: newCartList,
        }));
      } catch (error) {
        console.error(error);
      }
    },
    [
      cart.cartItems,
      openUnAuthenticatedModal,
      updateCart,
      user?.cart?.id,
      user?.id,
    ]
  );
  //
  const handleAddToCart = useCallback(
    async (product: Product1, units: number) => {
      if (!user?.id || !user?.cart?.id) {
        openUnAuthenticatedModal(true);
        return;
      }
      try {
        //
        if (
          cart.cartItems.filter((item) => item.product.id === product.id)
            .length > 0
        ) {
          handleUpdateQty(product, units);
          return;
        }
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
            cartItems: [...cart.cartItems, newItem].map((item) => ({
              units: item.units,
              productId: item.product.id,
            })),
          },
        });
        //
        setCart((prev) => ({
          ...prev,
          cartItems: [...cart.cartItems, newItem],
        }));
      } catch (error) {
        console.error(error);
      }
    },
    [
      cart.cartItems,
      handleUpdateQty,
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
      try {
        await updateCart({
          userId: user?.id,
          cartId: user?.cart?.id,
          body: {
            cartItems: cart.cartItems
              .filter((item) => item.product.id !== product.id)
              .map((item) => ({
                units: item.units,
                productId: item.product.id,
              })),
          },
        });
        //
        setCart((prev) => ({
          ...prev,
          cartItems: prev.cartItems.filter(
            (item) => item.product.id !== product.id
          ),
        }));
      } catch (error) {
        console.error(error);
      }
    },
    [
      cart.cartItems,
      openUnAuthenticatedModal,
      updateCart,
      user?.cart?.id,
      user?.id,
    ]
  );
  //
  const totalPrice = useMemo(
    () =>
      cart.cartItems.reduce(
        (accumulator, current) =>
          (accumulator = accumulator + current.product.price * current.units),
        0
      ),
    [cart.cartItems]
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
    }),
    [
      cart,
      handleAddToCart,
      handleFetch,
      handleRemoveFromCart,
      handleUpdateQty,
      isCartFetching,
      isUpdating,
      totalPrice,
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
