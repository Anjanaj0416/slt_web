import { CheckoutServiceContext } from "contexts/CheckoutServiceContext";
import { useContext } from "react";

const useCheckoutService = () => useContext(CheckoutServiceContext);

export default useCheckoutService;
