import { Review1 } from "models/Review.model";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const useWishList = (reviews: Review1[]) => {
  const [filteredReviews, setReviews] = useState(reviews);

  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    +searchParams.get("page") || 1
  );

  useEffect(() => {
    setReviews(reviews);
  }, [setReviews, reviews]);

  // HANDLE CHANGE PAGINATION
  const handleChangePage = (_: unknown, newPage: number) =>{
    setCurrentPage(newPage);
    router.push(`?page=${newPage}`);
  };

  return {
    currentPage,
    handleChangePage,
    filteredReviews,
  };
};

export default useWishList;
