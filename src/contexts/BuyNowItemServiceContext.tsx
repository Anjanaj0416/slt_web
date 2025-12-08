"use client";

import { calculateDiscountAmount } from "lib";
//
import { Product1, ProductVariant } from "models/Product.model";
import { CartItem, User1 } from "models/User.model";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from "react";
//
type ContextState = {
  handleAddToItem: (
    items: {
      product: Product1;
      productVariant: ProductVariant;
      units: number;
    }[]
  ) => void;
  items: CartItem[];
  setItems: Dispatch<SetStateAction<CartItem[]>>;
  handleUpdateQty: (productVariant: ProductVariant, units: number) => void;
  totalPrice: number;
  totalDiscount: number;
  note: string;
  setNote: Dispatch<SetStateAction<string>>;
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
};
//
const initState: ContextState = {
  handleAddToItem: () => {},
  items: [],
  setItems: () => {},
  handleUpdateQty: () => {},
  totalPrice: 0,
  totalDiscount: 0,
  note: "",
  voucherDiscounts: null,
  setNote: () => {},
  increaseVoucherDiscount: () => {},
  removeVoucherDiscount: () => {},
};
//
export const BuyNowItemServiceContext = createContext<ContextState>(initState);
//
type Props = {
  children: ReactNode;
};
//
const BuyNowItemServiceProvider = (props: Props) => {
  const router = useRouter();

  const [note, setNote] = useState<string>("");

  const [items, setItems] = useState<CartItem[]>([]);

  const [voucherDiscounts, setVoucherDiscounts] = useState<
    { voucherCode: string; variantId: string; discount: number }[]
  >([]);

  const handleUpdateQty = async (
    productVariant: ProductVariant,
    units: number
  ) => {
    // TODO: Fix user session loading issue

    // if (!user?.id) {
    //   openUnAuthenticatedModal(true);
    //   return;
    // }

    const newItemList = items?.map((item) =>
      item?.productVariant?.id === productVariant?.id
        ? { ...item, units: item?.units + units }
        : item
    );
    //
    setItems(newItemList);
  };

  //
  const handleAddToItem = (
    items: {
      product: Product1;
      productVariant: ProductVariant;
      units: number;
    }[]
  ) => {
    // if (!user?.id) {
    //   openUnAuthenticatedModal(true);
    //   return;
    // }
    const newItems: CartItem[] = items.map((item) => {
      const {
        id: productId,
        images,
        minPrice,
        maxPrice,
        weight,
        productType,
        brand,
        discountType,
        discountAmount,
        deliveryPartner,
        name: productName,
      } = item.product;
      //
      return {
        productId,
        minPrice,
        maxPrice,
        images,
        weight,
        productVariant: item.productVariant,
        units: item.units,
        productName,
        brand,
        productType,
        discountAmount,
        deliveryPartner,
        discountType,
      };
    });

    //
    setItems(newItems);
    router.push("/buy-now/items");
  };
  //
  const totalPrice = useMemo(
    () =>
      items?.reduce(
        (accumulator, current) =>
          (accumulator =
            accumulator + current?.productVariant?.price * current?.units),
        0
      ),
    [items]
  );

  const totalDiscount = useMemo(() => {
    const sumOfDiscount = items?.reduce(
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
  }, [items, voucherDiscounts]);

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

  const removeVoucherDiscount = (voucherCode: string) => {
    setVoucherDiscounts((prvState) => {
      return prvState.filter(
        (voucherDiscount) => voucherDiscount.voucherCode != voucherCode
      );
    });
  };

  //
  const returnValue: ContextState = useMemo(
    () => ({
      handleAddToItem,
      items,
      setItems,
      handleUpdateQty,
      voucherDiscounts,
      increaseVoucherDiscount,
      removeVoucherDiscount,
      totalPrice,
      totalDiscount,
      note,
      setNote,
    }),
    [items, totalPrice, totalDiscount, note]
  );
  //
  return (
    <BuyNowItemServiceContext.Provider value={returnValue}>
      {props.children}
    </BuyNowItemServiceContext.Provider>
  );
};
//
export default BuyNowItemServiceProvider;
