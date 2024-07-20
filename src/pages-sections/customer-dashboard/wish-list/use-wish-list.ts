import { WishlistContext } from "contexts/WishlistContext";
import { UserWishlist } from "models/User.model";
import { useRouter, useSearchParams } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import { useUpdateWishlistMutation } from "services/wishlist-api";

const useWishList = (wishlist: UserWishlist, userId: string) => {
  const [updateWishlist, { isLoading: isUpdating, error }] =
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

  // HANDLE REMOVE FAVORITE
  const handleFavorite = async (id: string) => {
    if (userId) {
      const oldWishlistProducts = [...filteredWishlist?.products];
      const newWishListProducts = filteredWishlist?.products.filter(
        (product) => product.id != id
      );
      setWishlist((prvState) => ({
        ...prvState,
        products: newWishListProducts,
      }));
      //
      const productIds = newWishListProducts.map((product) => product.id);
      //
      await updateWishlist({
        userId: userId,
        wishlistId: filteredWishlist?.id,
        body: { productIds },
      });
      //
      if (error) {
        setWishlist((prvState) => ({
          ...prvState,
          products: oldWishlistProducts,
        }));
        enqueueSnackbar("Something went to wrong", {
          variant: "error",
        });
      }
      //
      const currentPageProducts = newWishListProducts.slice(
        (currentPage - 1) * 6,
        (currentPage - 1) * 6 + 6
      );
      if (currentPageProducts.length < 1) {
        handleChangePage(currentPage - 1);
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
