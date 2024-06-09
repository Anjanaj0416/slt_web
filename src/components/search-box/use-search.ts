import { ChangeEvent, useEffect, useRef, useState, useTransition } from "react";
import { useLazySearchListProductsQuery } from "services/product-api";

const useSearch = () => {
  const parentRef = useRef();

  const [_, startTransition] = useTransition();
  const [category, setCategory] = useState("*");
  const [resultList, setResultList] = useState<string[]>([]);
  const [categoryTitle, setCategoryTitle] = useState("All Categories");
  const [listProducts] = useLazySearchListProductsQuery();

  // HANDLE CHANGE THE CATEGORY
  const handleCategoryChange =
    (cat: { title: string; value: string }) => () => {
      setCategory(cat.value);
      setCategoryTitle(cat.title);
    };

  // FETCH PRODUCTS VIA API
  const getProducts = async (searchText: string, categoryId?: string) => {
    const productList = (
      await listProducts({
        filters: categoryId
          ? `name=${searchText}&categoryId=${categoryId}`
          : `name=${searchText}&categoryName=${searchText}`,
      })
    ).data?.data;
    if (productList.length) {
      const data = productList.map((e) => e.name);
      setResultList(data);
    } else {
      setResultList([]);
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      const value = e.target?.value;

      if (!value) setResultList([]);
      else if (value && category !== "*") getProducts(value, category);
      else getProducts(value);
    });
  };

  const handleDocumentClick = () => setResultList([]);

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", handleDocumentClick);
  }, []);

  return {
    category,
    parentRef,
    resultList,
    handleSearch,
    categoryTitle,
    handleCategoryChange,
  };
};

export default useSearch;
