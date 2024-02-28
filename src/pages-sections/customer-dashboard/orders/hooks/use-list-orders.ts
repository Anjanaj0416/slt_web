import { useEffect, useState } from "react";
import { useLazyGetOrdersQuery } from "services/order-api";
import { useSession } from "next-auth/react";
import { User1 } from "models/User.model";
import usePagination from "hooks/usePagination";
//
const useListOrders = (data: any[]) => {
  const { data: session } = useSession();
  const user = session?.user as User1;
  const [filteredStores, setFilteredStores] = useState<any[]>(data);
  const {
    setTotalPage,
    page,
    nextPage,
    previousPage,
    hasNextPage,
    hasPreviousPage,
    totalPage,
    setPage,
  } = usePagination();
  const [listOrders, { isLoading }] = useLazyGetOrdersQuery();
  //
  useEffect(() => {
    if (page === null) return;
    if (user?.id) {
      fetchingOrders(user);
    }
  }, [user, page]);
  //
  const fetchingOrders = async (user) => {
    const { data } = await listOrders({
      userId: user?.id,
      page: page ?? 0,
    });

    setTotalPage(data?.totalPages);
    if (data?.data) {
      const filteredStoresArray = data?.data.map((store) => ({
        id: store.id,
        name: store.name,
        logo: store.logo,
        telephone: store.telephone,
        storeStatus: store.storeStatus,
        slug: store.slug,
        brFilePath: store.brFilePath,
        logoFilePath: store.logoFilePath,
      }));
      setFilteredStores(filteredStoresArray);
    }
  };
  //
  const handleTablePagination = (_: unknown, newPage: number) => {
    setPage(newPage - 1);
  };

  return {
    isLoading,
    filteredStores,
    nextPage,
    previousPage,
    hasNextPage,
    hasPreviousPage,
    page,
    totalPage,
    handleTablePagination,
  };
};
export default useListOrders;
