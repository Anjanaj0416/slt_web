import { useEffect, useState } from "react";
import { useLazySearchListProductsQuery } from "services/product-api";
import usePagination from "hooks/usePagination";
import { Product1 } from "models/Product.model";
//
const useListProducts = (
  products: Product1[],
  filters: string,
  initTotalPages: number,
  setTotalResult: (value: number) => void
) => {
  const [filteredProducts, setFilteredProducts] =
    useState<Product1[]>(products);
  const { setTotalPage, page, setPage, totalPage } = usePagination({
    totalPage: initTotalPages,
  });
  const [listProducts, { isFetching: isLoading }] =
    useLazySearchListProductsQuery();
  //
  useEffect(() => {
    if (
      page === null &&
      !(
        filters.includes("sort=") ||
        filters.includes("Price=") ||
        filters.includes("brand=")
      )
    ) {
      return;
    }
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
            setTotalResult(data.totalResults);

            setTotalPage(data.totalPages);
          }
        }
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, [filters, listProducts, page, setTotalPage, setTotalResult]);

  return {
    isLoading,
    filteredProducts,
    page,
    totalPage,
    setPage,
  };
};

export default useListProducts;
