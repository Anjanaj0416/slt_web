import { Metadata } from "next";
import { WishListPageView } from "pages-sections/customer-dashboard/wish-list";
// API FUNCTIONS
import { getWishListProducts } from "utils/__api__/wish-list";
import request from "utils/request";
import API from "constants/users";
import { notFound } from "next/navigation";
import { auth } from "utils/auth";
import FavoriteStoresPageView from "pages-sections/customer-dashboard/favorite-stores/favorite-stores";

export const metadata: Metadata = {
  title: "Favorite Stores - SLT Marcketplace Next.js E-commerce Template",
  description: `SLT Marcketplace is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  viewport: "width=device-width, initial-scale=1",
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function FavoriteStore() {
  try {
    const data = await auth();

    const user = await request(API.GET_USERS, {
      userId: data.user?.id,
    });

    return <FavoriteStoresPageView favoriteStores={user.followedStores} />;
  } catch (error) {
    console.log(error);

    notFound();
  }
}
