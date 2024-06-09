import { useEffect, useState } from "react";
import { useLazySearchListProductsQuery } from "services/product-api";
import usePagination from "hooks/usePagination";
import { Product1 } from "models/Product.model";
//
const useListProducts = (products: Product1[], filters: string) => {
  const [filteredProducts, setFilteredProducts] =
    useState<Product1[]>(products);
  const { setTotalPage, page, setPage, totalPage } = usePagination();
  const [listProducts, { isLoading }] = useLazySearchListProductsQuery();
  //
  useEffect(() => {
    if (page === null) return;
    const fetchData = async () => {
      try {
        const data = await listProducts({ filters, page }).unwrap();

        if (data) {
          setTotalPage(data?.totalPages);

          if (data?.data) {
            const filteredProductArray = data?.data?.map((item) => ({
              id: item.id,
              name: item.name,
              brand: item?.brand ?? "-",
              price: item.price,
              units: item.units,
              images: item.images,
              productStatus: item.productStatus,
              category: item.category,
              specification: item.specification,
            }));

            setFilteredProducts(filteredProductArray);
          }
        }
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, [filters, listProducts, page, setTotalPage]);

  return {
    isLoading,
    filteredProducts,
    page,
    totalPage,
    setPage,
  };
};

export default useListProducts;
