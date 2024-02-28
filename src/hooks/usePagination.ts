import { useState } from "react";

const usePagination = () => {
  const [page, setPage] = useState<number>(null);
  const [totalPage, setTotalPage] = useState<number>(0);

  const nextPage = () => {
    if (page + 1 < totalPage) {
      setPage(page + 1);
    }
  };
  const previousPage = () => {
    if (page > -1) {
      setPage(page - 1);
    }
  };
  const hasNextPage = () => {
    return page < totalPage;
  };
  const hasPreviousPage = () => {
    return page > 0;
  };
  return {
    setTotalPage,
    totalPage,
    page,
    nextPage,
    previousPage,
    hasNextPage,
    hasPreviousPage,
    setPage,
  };
};
//
export default usePagination;
