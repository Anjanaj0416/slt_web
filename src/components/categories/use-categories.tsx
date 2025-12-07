// hooks/useCategories.ts
import { useMemo, useCallback } from "react";
import { useFilteredCategoriesQuery } from "services/category-api";
import Category1 from "models/Category.model";

type MenuItem = {
  title: string;
  icon: string | null;
  href: string;
  subCategories?: MenuItem[];
};

export const useCategories = () => {
  const { data, isLoading } = useFilteredCategoriesQuery({ size: 20 });

  const mapCategoriesToMenu = useCallback(
    (categories: Category1[]): MenuItem[] => {
      return categories.map((category) => {
        const { id, name, iconUrl, subCategories } = category;

        const item: MenuItem = {
          title: name,
          icon: iconUrl ?? null,
          href: `/products/search?categoryId=${id}_${encodeURIComponent(name)}`,
        };

        if (subCategories?.length) {
          item.subCategories = mapCategoriesToMenu(subCategories);
        }

        return item;
      });
    },
    []
  );

  // memoize mapped categories
  const categories = useMemo(() => {
    if (!data?.data?.length) return [];
    return mapCategoriesToMenu(data.data);
  }, [data?.data, mapCategoriesToMenu]);

  return { categories, isLoading };
};

export default useCategories;
