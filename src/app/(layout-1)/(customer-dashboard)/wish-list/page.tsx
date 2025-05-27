import { Metadata } from "next";
import { WishListPageView } from "pages-sections/customer-dashboard/wish-list";

import { cachedRequest } from "utils/request";
import API from "constants/wishlist";
import { notFound } from "next/navigation";
import { auth } from "utils/auth";

export const metadata: Metadata = {
  title: "Wishlist - TRADEZ ",
  description: `TRADEZ is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  viewport: "width=device-width, initial-scale=1",
  keywords: ["e-commerce", "e-commerce", "TRADEZ"],
};

export default async function WishList() {
  try {
    const { user } = await auth();

    const wishlist = await cachedRequest(API.GET_WISHLISTS, {
      userId: user.id,
      wishlistId: user.wishlist.id,
    });

    return <WishListPageView wishlist={wishlist} />;
  } catch (error) {
    console.error(error);
    notFound();
  }
}
