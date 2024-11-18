/**
 * Defines the API paths for categories
 */
const API = {
  GET_USER_ORDERS: {
    path: "/users/:userId/orders?:query",
    method: "GET",
  },
  GET_USER_ORDER: {
    path: "/users/:userId/orders/:orderId",
    method: "GET",
  },
};
//
export default API;
