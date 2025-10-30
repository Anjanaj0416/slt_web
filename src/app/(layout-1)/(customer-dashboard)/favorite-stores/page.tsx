import { Metadata } from "next";
import { cachedRequest } from "utils/request";
import API from "constants/users";
import { notFound } from "next/navigation";
import { auth } from "utils/auth";
import FavoriteStoresPageView from "pages-sections/customer-dashboard/favorite-stores/favorite-stores";

export const metadata: Metadata = {
  title: "Favorite Stores - TRADEZ ",
  description: `TRADEZ is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,

  viewport: "width=device-width, initial-scale=1",
  keywords: ["Tradez"],
};

export default async function FavoriteStore() {
  try {
    const data = await auth();

    const user = await cachedRequest(API.GET_USERS, { userId: data.user?.id });

    return <FavoriteStoresPageView favoriteStores={user.followedStores} />;
  } catch (error) {
    console.log(error);
    notFound();
  }
}
