import { FC } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
// GLOBAL CUSTOM HOOK
import useCart from "hooks/useCart";
// LOCAL CUSTOM COMPONENTS
import TopHeader from "./top-header";
import MiniCartItem from "./cart-item";
import EmptyCartView from "./empty-view";
import BottomActions from "./bottom-actions";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// CUSTOM DATA MODEL
import { CartItem } from "contexts/CartContext";

// =========================================================
type Props = { toggleSidenav: () => void };
// =========================================================

const MiniCart: FC<Props> = ({ toggleSidenav }) => {
  const { push } = useRouter();
  const { state, dispatch } = useCart();
  const cartList = state.cart;

  const handleCartAmountChange = (amount: number, product: CartItem) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: { ...product, qty: amount },
    });
  };

  const getTotalPrice = () => {
    return cartList.reduce((acc, item) => acc + item.price * item.qty, 0);
  };

  const handleNavigate = (path: string) => () => {
    toggleSidenav();
    push(path);
  };

  return (
    <Box width="100%" maxWidth={380}>
      <Box overflow="auto" height={`calc(100vh - ${cartList.length ? "80px - 3.25rem" : "0px"})`}>
        {/* HEADING SECTION */}
        <TopHeader toggle={toggleSidenav} total={cartList.length} />

        <Divider />

        {/* EMPTY CART VIEW */}
        {cartList.length === 0 ? <EmptyCartView /> : null}

        {/* CART ITEM LIST */}
        {cartList.map((item) => (
          <MiniCartItem key={item.id} item={item} handleCartAmountChange={handleCartAmountChange} />
        ))}
      </Box>

      {/* CART BOTTOM ACTION BUTTONS */}
      {cartList.length > 0 ? (
        <BottomActions total={currency(getTotalPrice())} handleNavigate={handleNavigate} />
      ) : null}
    </Box>
  );
};

export default MiniCart;
