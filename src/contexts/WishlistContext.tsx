"use client";

import { User1, UserWishlist } from "models/User.model";
import { useSession } from "next-auth/react";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useLazyGetWishlistQuery } from "services/wishlist-api";

// ==============================================================
interface ContextState {
  wishlist: UserWishlist;
  setWishlist: Dispatch<SetStateAction<UserWishlist>>;
}
// ==============================================================

const initState: ContextState = {
  wishlist: {
    id: "",
    products: [],
  },
  setWishlist: () => {},
};

export const WishlistContext = createContext<ContextState>(initState);

export const WishlistProvider = ({ children }: PropsWithChildren) => {
  const session = useSession();
  const user = session?.data?.user as User1;
  const [fetchWishlist] = useLazyGetWishlistQuery();
  const [wishlist, setWishlist] = useState<UserWishlist>({
    id: "",
    products: [],
  });

  const handleFetch = useCallback(async () => {
    if (!user?.id || !user?.wishlist?.id) {
      return;
    }
    try {
      const res = await fetchWishlist({
        userId: user?.id,
        wishlistId: user?.wishlist?.id,
      });
      //
      if (res?.data) setWishlist(res?.data);
    } catch (error) {
      console.error(error);
    }
  }, [fetchWishlist, user?.wishlist?.id, user?.id]);
  //
  useEffect(() => {
    if (user?.id && user?.wishlist?.id) {
      handleFetch();
    }
  }, [handleFetch, user?.wishlist?.id, user?.id]);
  return (
    <WishlistContext.Provider value={{ wishlist, setWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
