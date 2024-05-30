"use client";
//
import { ReactNode, createContext, useState } from "react";
import View from "./View";
//
export const context = createContext({
  isOpen: false,
  setIsOpen: null,
  handleClose: null,
});
//
type Props = {
  children: ReactNode;
};
//
const Provider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <context.Provider value={{ isOpen, setIsOpen, handleClose }}>
      {children}
      <View isOpen={isOpen} handleClose={handleClose} />
    </context.Provider>
  );
};
//
export default Provider;
