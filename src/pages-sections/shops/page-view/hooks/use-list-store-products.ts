import { useEffect, useState } from "react";
import usePagination from "hooks/usePagination";
import { Product1 } from "models/Product.model";
import { useLazyGetProductsByStoreIdQuery } from "services/product-api";
//
const useListStoreProducts = (
  storeId: string,
  categoryId: string,
  minPrice: number,
  maxPrice: number,
  brand: string,
  products: Product1[],
  initTotalPages: number,
  pageSize: number,
  initialTotalResult: number
) => {
  const [productList, setProductList] = useState<Product1[]>(products);
  const [totalResult, setTotalResult] = useState(initialTotalResult);
  const { page, setPage, setTotalPage, totalPage } = usePagination({
    totalPage: initTotalPages,
  });
  const [listProducts, { isFetching: isLoading }] =
    useLazyGetProductsByStoreIdQuery();
  //
  useEffect(() => {
    if (!page && page !== 0) {
      return;
    }

    (async () => {
      try {
        console.log(brand);
        const data = await listProducts({
          categoryId,
          minPrice,
          maxPrice,
          brand,
          storeId,
          page,
          size: pageSize,
        }).unwrap();

        if (data?.data) {
          const products = data?.data?.map((item: Product1) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            brand: item.brand,
            category: item.category,
            discount: item.discount,
            discountType: item.discountType,
            images: item.images,
            description: item.description,
          }));

          setProductList(products);
          setTotalResult(data.totalResults);
          setTotalPage(data.totalPages);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [listProducts, categoryId, page, pageSize, storeId, maxPrice, minPrice, setTotalPage, brand]);

  return {
    isLoading,
    productList,
    page,
    totalResult,
    totalPage,
    setPage,
  };
};

export default useListStoreProducts;
