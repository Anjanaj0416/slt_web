import { Metadata } from "next";
import { WishListPageView } from "pages-sections/customer-dashboard/wish-list";
// API FUNCTIONS
import { getWishListProducts } from "utils/__api__/wish-list";
import { auth } from "../../../../../tools/output/src/utils/auth";
import request from "utils/request";
import API from "constants/wishlist";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Wishlist - Bazaar Next.js E-commerce Template",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  viewport: "width=device-width, initial-scale=1",
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function WishList({ searchParams }) {
  try {
    const { user } = await auth();

    const wishlist = await request(API.GET_WISHLISTS, {
      userId: user?.id,
      wishlistId: user?.wishlist.id,
    });

    return (
      <WishListPageView
        wishlist={wishlist}
        totalProducts={wishlist?.products?.length}
      />
    );
  } catch (error) {
    notFound();
  }
}
