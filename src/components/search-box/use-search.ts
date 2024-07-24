import { ChangeEvent, useEffect, useRef, useState, useTransition } from "react";
import { useLazySearchListProductsQuery } from "services/product-api";
import { useLazyGetStoreAndProductSearchQuery } from "services/store-and-product-search-api";
import StoreProductSearch from "../../models/StoreProductSearch.model";

const useSearch = () => {
  const parentRef = useRef();

  const [_, startTransition] = useTransition();
  const [categoryId, setCategoryId] = useState("*");
  const [resultList, setResultList] = useState<StoreProductSearch[]>([]);
  const [categoryTitle, setCategoryTitle] = useState("All Categories");
  const [listProducts] = useLazySearchListProductsQuery();
  const [searchStoreAndProduct] = useLazyGetStoreAndProductSearchQuery();

  // HANDLE CHANGE THE CATEGORY
  const handleCategoryChange =
    (cat: { title: string; value: string }) => () => {
      setCategoryId(cat.value);
      setCategoryTitle(cat.title);
    };

  // FETCH PRODUCTS VIA API
  const getProducts = async (searchText: string, categoryId?: string) => {
    let searchData;

    if (categoryId) {
      const searchResults = (
        await listProducts({
          filters: `name=${searchText}&categoryId=${categoryId}`,
        })
      ).data?.data;
      searchData = searchResults.map((e) => ({
        id: e.id,
        name: e.name,
        type: "PRODUCT",
      }));
    } else {
      searchData = (await searchStoreAndProduct({ search: searchText })).data;
    }

    if (searchData.length) {
      setResultList(searchData);
    } else {
      setResultList([]);
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      const value = e.target?.value;

      if (!value) setResultList([]);
      else if (value && categoryId !== "*") getProducts(value, categoryId);
      else getProducts(value);
    });
  };

  const handleDocumentClick = () => setResultList([]);

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", handleDocumentClick);
  }, []);

  return {
    categoryId,
    parentRef,
    resultList,
    handleSearch,
    categoryTitle,
    handleCategoryChange,
  };
};

export default useSearch;
