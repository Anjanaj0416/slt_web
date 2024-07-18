import { useEffect, useState } from "react";
import usePagination from "hooks/usePagination";
import { Product1 } from "models/Product.model";
import { useLazyGetProductsByStoreIdQuery } from "services/product-api";
import { categories } from "__server__/__db__/market-1/data";
//
const useListStoreProducts = (
  storeId: string,
  products: Product1[],
  initTotalPages: number,
  pageSize: number
  //setTotalResult: (value: number) => void
) => {
  const [productList, setProductList] = useState<Product1[]>(products);
  const { page, setPage } = usePagination({
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
        const data = await listProducts({
          storeId,
          page,
          size: pageSize,
        }).unwrap();

        if (data?.data) {
          const products = data?.data?.map((item: Product1) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            brand:item.brand,
            category:item.category,
            discount: item.discount,
            discountType: item.discountType,
            images: item.images,
            description: item.description,
          }));

          setProductList(products);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [listProducts, page, pageSize]);

  return {
    isLoading,
    productList,
    page,
    setPage,
  };
};

export default useListStoreProducts;
