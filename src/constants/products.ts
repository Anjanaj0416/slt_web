/**
 * Defines the API paths for products
 */
const API = {
  GET_PRODUCTS: {
    path: "/products?:query",
    method: "GET",
  },
  GET_PRODUCTS_BY_STORE_ID: {
    path: "/stores/:storeId/products?:query",
    method: "GET",
  },
};
//
export default API;
