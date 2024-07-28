import { useEffect, useState } from "react";
import { useLazyGetOrdersQuery } from "services/order-api";
import { useSession } from "next-auth/react";
import { User1 } from "models/User.model";
import usePagination from "hooks/usePagination";
import { Order1 } from "models/Order.model";
//
const useListOrders = (data: Order1[]) => {
  const { data: session } = useSession();
  const user = session?.user as User1;
  const [filteredOrders, setFilteredOrders] = useState<Order1[]>(data);
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
  const [listOrders, { isFetching: isLoading }] = useLazyGetOrdersQuery();
  //
  useEffect(() => {
    if (page === null) return;
    if (user?.id) {
      const fetchingOrders = async () => {
        const { data } = await listOrders({
          userId: user?.id,
          page: page ?? 0,
        });
        setTotalPage(data?.totalPages);

        if (data?.data) {
          const filteredOrdersArray = data?.data.map((order: Order1) => ({
            id: order.id,
            note: order.note,
            shippingAddress: order.shippingAddress,
            billingAddress: order.billingAddress,
            payments: order.payments,
            packages: order.packages,
            createdAt: order.createdAt,
          }));
          setFilteredOrders(filteredOrdersArray);
        }
      };
      fetchingOrders();
    }
  }, [user, page, listOrders, setTotalPage]);
  //
  const handleTablePagination = (_: unknown, newPage: number) => {
    setPage(newPage - 1);
  };

  return {
    isLoading,
    filteredOrders,
    nextPage,
    previousPage,
    hasNextPage,
    hasPreviousPage,
    setPage,
    page,
    totalPage,
    handleTablePagination,
  };
};
export default useListOrders;
