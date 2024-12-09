import Store from "models/Store.model";
import { useState } from "react";

const limit = 6;

const useFavoriteStore = (stores: Store[]) => {
  const [filteredFavStores, setFilteredFavStores] = useState<Store[]>(
    stores.slice(0, limit)
  );
  const [currentPage, setCurrentPage] = useState(1);

  // HANDLE CHANGE PAGINATION
  const handleChangePage = (page: number) => {
    setFilteredFavStores(
      stores.slice(currentPage - 1 * limit, currentPage * limit)
    );
    setCurrentPage(page);
  };

  return {
    filteredFavStores,
    currentPage,
    handleChangePage,
  };
};

export default useFavoriteStore;
