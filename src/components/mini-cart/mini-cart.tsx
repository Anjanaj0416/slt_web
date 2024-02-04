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
// GLOBAL CUSTOM COMPONENT
import Scrollbar from "components/Scrollbar";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// CUSTOM DATA MODEL
import useCartService from "hooks/useCartService";

// =========================================================
type Props = { toggleSidenav: () => void };
// =========================================================

const MiniCart: FC<Props> = ({ toggleSidenav }) => {
  const { push } = useRouter();
  const { cart, totalPrice } = useCartService();
  const cartList = cart.cartItems;

  const handleNavigate = (path: string) => () => {
    toggleSidenav();
    push(path);
  };

  return (
    <Box width="100%" minWidth={380}>
      {/* HEADING SECTION */}
      <TopHeader toggle={toggleSidenav} total={cartList.length} />

      <Divider />

      <Box height={`calc(100vh - ${cartList.length ? "207px" : "75px"})`}>
        {/* CART ITEM LIST */}
        {cartList.length > 0 ? (
          <Scrollbar>
            {cartList.map((item) => (
              <MiniCartItem key={item.product.id} item={item} />
            ))}
          </Scrollbar>
        ) : (
          <EmptyCartView />
        )}
      </Box>

      {/* CART BOTTOM ACTION BUTTONS */}
      {cartList.length > 0 ? (
        <BottomActions
          total={currency(totalPrice)}
          handleNavigate={handleNavigate}
        />
      ) : null}
    </Box>
  );
};

export default MiniCart;
