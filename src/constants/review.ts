/**
 * Defines the API paths for reviews
 */
const API = {
  GET_REVIEWS: {
    path: "/reviews?:query",
    method: "GET",
  },
  GET_USER_REVIEWS: {
    path: "/users/:userId/reviews?:query",
    method: "GET",
  },
};
//
export default API;
