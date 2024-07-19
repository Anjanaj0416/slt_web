import { useEffect, useState } from "react";
import usePagination from "hooks/usePagination";
import Store from "models/Store.model";
import { useLazyListStoreQuery } from "services/store-api";
//
const useListStores = (
  stores: Store[],
  initTotalPages: number,
  pageSize: number
  //setTotalResult: (value: number) => void
) => {
  const [storeList, setStoreList] = useState<Store[]>(stores);
  const { page, setPage } = usePagination({
    totalPage: initTotalPages,
  });
  const [listStores, { isFetching: isLoading }] = useLazyListStoreQuery();
  //
  useEffect(() => {
    if (!page && page !== 0) {
      return;
    }

    (async () => {
      try {
        const data = await listStores({ page, size: pageSize }).unwrap();

        if (data?.data) {
          const stores = data?.data?.map((item: Store) => ({
            id: item.id,
            description: item.name,
            telephone: item.telephone,
            address: item.address,
            logoFilePath: item.logoFilePath,
          }));

          setStoreList(stores);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [listStores, page, pageSize]);

  return {
    isLoading,
    storeList,
    page,
    setPage,
  };
};

export default useListStores;
