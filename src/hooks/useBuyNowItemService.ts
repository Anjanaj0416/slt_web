"use client";
//
import { useContext } from "react";
import { BuyNowItemServiceContext } from "contexts/BuyNowItemServiceContext";
//
const useBuyNowItemService = () => useContext(BuyNowItemServiceContext);
//
export default useBuyNowItemService;
