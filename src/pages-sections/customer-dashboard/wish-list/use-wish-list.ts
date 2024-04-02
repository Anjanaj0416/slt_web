import { WishlistContext } from "contexts/WishlistContext";
import { UserWishlist } from "models/User.model";
import { useRouter, useSearchParams } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import { useUpdateWishlistMutation } from "services/wishlist-api";

const useWishList = (wishlist: UserWishlist, userId: string) => {
  const [updateWishlist, { isLoading: isUpdating }] =
    useUpdateWishlistMutation();
  const { wishlist: filteredWishlist, setWishlist } =
    useContext(WishlistContext);

  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    +searchParams.get("page") || 1
  );

  useEffect(() => {
    setWishlist(wishlist);
  }, [setWishlist, wishlist]);

  // HANDLE CHANGE PAGINATION
  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    router.push(`?page=${page}`);
  };
  const handleFavorite = async (id: string) => {
    if (userId) {
      const wishListProductIds = filteredWishlist?.products?.map(
        (product) => product.id
      );
      const productIds = wishListProductIds?.filter(
        (productId) => productId != id
      );
      //
      const response = await updateWishlist({
        userId: userId,
        wishlistId: filteredWishlist?.id,
        body: { productIds },
      });
      //
      if ("data" in response) {
        //setFilteredWishlist(response.data);
        setWishlist(response.data);
      } else {
        enqueueSnackbar("Something went to wrong", {
          variant: "error",
        });
      }
    }
  };
  return {
    currentPage,
    handleChangePage,
    filteredWishlist,
    handleFavorite,
    isUpdating,
  };
};

export default useWishList;
