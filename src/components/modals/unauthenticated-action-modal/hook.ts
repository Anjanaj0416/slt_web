import { useContext } from "react";
import { context } from "./Provider";
//
const useUnAuthenticatedModal = () => useContext(context);
//
export default useUnAuthenticatedModal;
