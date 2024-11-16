import { FC } from "react";
import Box from "@mui/material/Box";
import styled from "@mui/material/styles/styled";
// LOCAL CUSTOM COMPONENTS
import MegaMenu1 from "./mega-menu/mega-menu-1";
import MegaMenu2 from "./mega-menu/mega-menu-2";
import CategoryMenuItem from "./category-menu-item";
// NAVIGATION DATA
import { useFilteredCategoriesQuery } from "services/category-api";
import Container from "@mui/material/Container";
import { ENVIRONMENT } from "config";
import { NavLink } from "components/nav-link";

// styled component
const Wrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "position" && prop !== "open",
})<Props>(({ theme, position, open }) => ({
  left: 0,
  zIndex: 98,
  right: "auto",
  borderRadius: 4,
  padding: "0.5rem 0px",
  transformOrigin: "top",
  boxShadow: theme.shadows[2],
  position: position || "unset",
  transition: "all 250ms ease-in-out",
  transform: open ? "scaleY(1)" : "scaleY(0)",
  backgroundColor: theme.palette.background.paper,
  top: position === "absolute" ? "calc(100% + 0.7rem)" : "0.5rem",
}));

const MAX_CATEGORY_MENU_ITEM = 12;
const MAX_CATEGORY_MEGA_MENU_LEVEL1 = 8;
const MAX_CATEGORY_MEGA_MENU_LEVEL2 = 6;

// ===============================================================
interface Props {
  open?: boolean;
  position?: "absolute" | "relative";
}
// ===============================================================

const CategoryMenuCard: FC<Props> = (props) => {
  const { open, position = "absolute" } = props;
  const { data, isLoading } = useFilteredCategoriesQuery({
    size: MAX_CATEGORY_MENU_ITEM,
  });
  const megaMenu = { MegaMenu1, MegaMenu2 };

  // find sub categories max depth of category
  const findMaxDepth = (category) => {
    if (
      !category ||
      !category.subCategories ||
      !Array.isArray(category.subCategories) ||
      category.subCategories.length === 0
    ) {
      return 0;
    }

    let maxDepth = 0;

    for (const subCategory of category.subCategories) {
      if (
        subCategory.subCategories &&
        Array.isArray(subCategory.subCategories)
      ) {
        const depth = findMaxDepth(subCategory);
        maxDepth = Math.max(maxDepth, depth);
      }
    }

    return 1 + maxDepth;
  };

  if (isLoading) {
    return (
      <Wrapper open={open} position={position}>
        <Container>Loading</Container>
      </Wrapper>
    );
  }
  // category data mapping
  const mappedCategories = data?.data.map((category) => {
    const parentName = category.name;
    const parentIcon = category.iconUrl;
    const level1Categories = category.subCategories;
    const maxDepth = findMaxDepth(category);

    const mapped = {
      title: parentName,
      icon: parentIcon,
      href: "#",
      menuComponent: maxDepth == 2 ? "MegaMenu1" : "MegaMenu2",
    };
    // available level 3
    if (maxDepth >= 3) {
      const categories =
        level1Categories.length > MAX_CATEGORY_MENU_ITEM
          ? level1Categories.slice(0, MAX_CATEGORY_MENU_ITEM)
          : level1Categories;
      //level 1 mapping
      const level1CategoriesMapped = categories.map((level1Category) => {
        const level1Name = level1Category.name;
        const level1Icon = level1Category.iconUrl;
        const level2Categories = level1Category.subCategories;
        const maxDepth = findMaxDepth(level1Category);
        //
        const level1Mapped = {
          title: level1Name,
          icon: level1Icon,
          href: `/products/search?categoryId=${level1Category.id}`,
          menuComponent: maxDepth >= 2 ? "MegaMenu1" : "MegaMenu2",
        };
        //level 2 mapping
        if (maxDepth >= 2) {
          // filter non empty subcategories
          const filteredCategories = level2Categories.filter(
            (category) =>
              category.subCategories && category.subCategories.length > 0
          );
          // set category limit
          const categories =
            filteredCategories.length > MAX_CATEGORY_MEGA_MENU_LEVEL1
              ? filteredCategories.slice(0, MAX_CATEGORY_MEGA_MENU_LEVEL1)
              : filteredCategories;
          //
          const level2CategoriesMapped = categories.map((level2Category) => {
            const level2Name = level2Category.name;
            const level2Icon = level2Category.iconUrl;
            const level3Categories =
              level2Category.subCategories.length >
              MAX_CATEGORY_MEGA_MENU_LEVEL2
                ? level2Category.subCategories.slice(
                    0,
                    MAX_CATEGORY_MEGA_MENU_LEVEL2
                  )
                : level2Category.subCategories;
            //
            const level2Mapped = {
              title: level2Name,
              icon: level2Icon,
              moreSubCategories:
                level2Category.subCategories.length >
                MAX_CATEGORY_MEGA_MENU_LEVEL2,
              href: `/products/search?categoryId=${level2Category.id}`,
            };
            //level 3 mapping
            if (level3Categories?.length > 0) {
              const level3CategoriesMapped = level3Categories.map(
                (level3Category) => ({
                  title: level3Category.name,
                  icon: level3Category.iconUrl,
                  href: `/products/search?categoryId=${level3Category.id}`,
                })
              );

              level2Mapped["subCategories"] = level3CategoriesMapped;
            }
            return level2Mapped;
          });
          level1Mapped["menuData"] = { categories: level2CategoriesMapped };
        } else if (maxDepth == 1) {
          const categories =
            level2Categories.length > MAX_CATEGORY_MENU_ITEM
              ? level2Categories.slice(0, MAX_CATEGORY_MENU_ITEM)
              : level2Categories;
          //
          const level2CategoriesMapped = categories.map((level2Category) => ({
            title: level2Category.name,
            icon: level2Category.iconUrl,
            href: `/products/search?categoryId=${level2Category.id}`,
            menuComponent: "MegaMenu2",
          }));
          level1Mapped["moreSubCategories"] =
            level2Categories.length > MAX_CATEGORY_MENU_ITEM;
          level1Mapped["menuData"] = level2CategoriesMapped;
        }
        return level1Mapped;
      });
      //
      mapped["moreSubCategories"] =
        level1Categories.length > MAX_CATEGORY_MENU_ITEM;
      mapped["menuData"] = level1CategoriesMapped;
    } else if (maxDepth > 1) {
      // filter non empty subcategories
      const filteredCategories = level1Categories.filter(
        (category) =>
          category.subCategories && category.subCategories.length > 0
      );
      // set category limit
      const categories =
        filteredCategories.length > MAX_CATEGORY_MEGA_MENU_LEVEL1
          ? filteredCategories.slice(0, MAX_CATEGORY_MEGA_MENU_LEVEL1)
          : filteredCategories;
      //
      const level1CategoriesMapped = categories.map((level1Category) => {
        const level1Name = level1Category.name;
        const level1Icon = level1Category.iconUrl;
        const level2Categories =
          level1Category.subCategories.length > MAX_CATEGORY_MEGA_MENU_LEVEL2
            ? level1Category.subCategories.slice(
                0,
                MAX_CATEGORY_MEGA_MENU_LEVEL2
              )
            : level1Category.subCategories;

        const level2CategoriesMapped = level2Categories.map(
          (level2Category) => ({
            title: level2Category.name,
            icon: level2Category.iconUrl,
            href: `/products/search?categoryId=${level2Category.id}`,
          })
        );
        //
        return {
          title: level1Name,
          icon: level1Icon,
          href: `/products/search?categoryId=${level1Category.id}`,
          subCategories: level2CategoriesMapped,
          moreSubCategories:
            level1Category.subCategories.length > MAX_CATEGORY_MEGA_MENU_LEVEL2,
        };
      });
      mapped["menuData"] = { categories: level1CategoriesMapped };
    }
    mapped.href = `/products/search?categoryId=${category.id}`;
    return mapped;
  });
  //
  return (
    <Wrapper open={open} position={position}>
      {mappedCategories.map((item) => {
        let MegaMenu = megaMenu[item.menuComponent];
        return (
          <CategoryMenuItem
            key={item.title}
            href={item.href}
            icon={
              item.icon
                ? `${ENVIRONMENT.S3_BUCKET_URL}/${item.icon}`
                : `${ENVIRONMENT.APP_URL}/assets/svg/default-category-icon.svg`
            }
            title={item.title}
            caret={!!item.menuData}
          >
            <MegaMenu
              data={item.menuData || []}
              moreSubCategories={item.moreSubCategories}
            />
          </CategoryMenuItem>
        );
      })}
      {data?.totalPages > 1 && (
        <NavLink
          style={{ color: "orange", textAlign: "center" }}
          className="child-link"
          href="#"
        >
          More Categories
        </NavLink>
      )}
    </Wrapper>
  );
};

export default CategoryMenuCard;
