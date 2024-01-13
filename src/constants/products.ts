/**
 * Defines the API paths for products
 */
const API = {
  GET_PRODUCTS: {
    path: "/products?:query",
    method: "GET",
  },
  GET_CATEGORIES: {
    path: "/categories?:query",
    method: "GET",
  },
  GET_BANNERS: {
    path: "/banners?:query",
    method: "GET",
  },
};
//
export default API;
