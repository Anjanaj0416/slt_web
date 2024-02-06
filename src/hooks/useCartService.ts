"use client";
//
import { useContext } from "react";
import { CartServiceContext } from "contexts/CartServiceContext";
//
const useCartService = () => useContext(CartServiceContext);
//
export default useCartService;
