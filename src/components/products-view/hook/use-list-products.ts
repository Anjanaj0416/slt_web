import { useEffect, useState } from "react";
import { useLazySearchListProductsQuery } from "services/product-api";
import usePagination from "hooks/usePagination";
import { Product1 } from "models/Product.model";
//
const useListProducts = (
  products: Product1[],
  name: string,
  categoryId: string,
  minPrice: number,
  maxPrice: number,
  brands: string[],
  initTotalPages: number,
  setTotalResult: (value: number) => void,
  sort?: string,
  categorySelect?: boolean
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
    console.log("call: ", categoryId);

    const fetchData = async () => {
      try {
        const filters = [];
        if (!categorySelect && name) {
          filters.push(`name=${name}`);
        }
        if (categoryId) {
          filters.push(`categoryId=${categoryId}`);
        }
        if (brands && brands.length > 0) {
          filters.push(`brand=${brands.join(",")}`);
        }
        if (minPrice !== null || minPrice !== undefined) {
          filters.push(`minPrice=${minPrice}`);
        }
        if (maxPrice !== null || maxPrice !== undefined) {
          filters.push(`maxPrice=${maxPrice}`);
        }
        if (sort) {
          filters.push(sort);
        }

        if (!page && filters.length === 0) {
          setFilteredProducts(products);
          setTotalPage(initTotalPages);
          setPage(1);
          return;
        }

        const data = await listProducts({
          filters: filters.join("&"),
          page: page - 1,
        }).unwrap();

        if (data) {
          setTotalPage(data?.totalPages);

          if (data?.data) {
            const filteredProductArray = data?.data?.map((item) => ({
              id: item.id,
              name: item.name,
              productType: item.productType,
              brand: item?.brand ?? "-",
              minPrice: item.minPrice,
              maxPrice: item.maxPrice,
              units: item.units,
              images: item.images,
              variants: item.variants,
              productStatus: item.productStatus,
              category: item.category,
              specification: item.specification,
              discountType: item.discountType,
              discountAmount: item.discountAmount,
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
  }, [
    brands,
    categoryId,
    categorySelect,
    initTotalPages,
    listProducts,
    maxPrice,
    minPrice,
    name,
    page,
    products,
    setPage,
    setTotalPage,
    setTotalResult,
    sort,
  ]);

  return {
    isLoading,
    filteredProducts,
    page,
    totalPage,
    setPage,
  };
};

export default useListProducts;
