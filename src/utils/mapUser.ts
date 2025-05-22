import { User1 } from "models/User.model";

const mapUser = (user: User1) => {

  const followedStoreIds = user?.followedStores
    ? user.followedStores?.map((store) => ({
        id: store.id,
      }))
    : [];
  const mappedUser: User1 = {
    ...user,
    cart: { id: user?.cart?.id, cartItems: null },
    wishlist: { id: user?.wishlist?.id, products: null },
    followedStores: followedStoreIds,
  };
  return mappedUser;
};

export default mapUser;
