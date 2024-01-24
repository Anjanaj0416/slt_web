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

// ===============================================================
interface Props {
  open?: boolean;
  position?: "absolute" | "relative";
}
// ===============================================================

const CategoryMenuCard: FC<Props> = (props) => {
  const { open, position = "absolute" } = props;
  const { data, error, isLoading } = useFilteredCategoriesQuery({ size: 12 });
  const megaMenu = { MegaMenu1, MegaMenu2 };

  function findMaxDepth(obj) {
    if (
      !obj ||
      !obj.subCategories ||
      !Array.isArray(obj.subCategories) ||
      obj.subCategories.length === 0
    ) {
      return 0; // Base case: no subcategories or not an array
    }

    let maxDepth = 0;

    for (const subCategory of obj.subCategories) {
      if (subCategory.subCategories && Array.isArray(subCategory.subCategories)) {
        const depth = findMaxDepth(subCategory);
        maxDepth = Math.max(maxDepth, depth);
      }
    }

    return 1 + maxDepth;
  }

  if (isLoading) {
    return (
      <Wrapper open={open} position={position}>
        <Container>Loading</Container>
      </Wrapper>
    );
  }
  // Category data mapping
  const mappedCategories = data?.data.map((category, index) => {
    const parentName = category.name;
    const parentIcon = category.icon;
    const level1Categories = category.subCategories;
    const maxDepth = findMaxDepth(category);

    const mapped = {
      title: parentName,
      icon: parentIcon,
      href: "#",
      menuComponent: maxDepth == 2 ? "MegaMenu1" : "MegaMenu2",
    };
    // Available level 3
    if (maxDepth >= 3) {
      const categories =
        level1Categories.length > 12 ? level1Categories.slice(0, 12) : level1Categories;
      //level 1 mapping
      const level1CategoriesMapped = categories.map((level1Category) => {
        const level1Name = level1Category.name;
        const level1Icon = level1Category.icon;
        const level2Categories = level1Category.subCategories;
        const maxDepth = findMaxDepth(level1Category);
        //
        const level1Mapped = {
          title: level1Name,
          icon: level1Icon,
          href: "#",
          menuComponent: maxDepth >= 2 ? "MegaMenu1" : "MegaMenu2",
        };
        //level 2 mapping
        if (maxDepth >= 2) {
          const categories =
            level2Categories.length > 8 ? level2Categories.slice(0, 8) : level2Categories;
          //
          const level2CategoriesMapped = categories.map((level2Category) => {
            const level2Name = level2Category.name;
            const level2Icon = level2Category.icon;
            const level3Categories =
              level2Category.subCategories.length > 6
                ? level2Category.subCategories.slice(0, 6)
                : level2Category.subCategories;
            //
            const level2Mapped = {
              title: level2Name,
              icon: level2Icon,
              href: "#",
            };
            //level 3 mapping
            if (level3Categories?.length > 0) {
              const level3CategoriesMapped = level3Categories.map((level3Category) => ({
                title: level3Category.name,
                icon: level3Category.icon,
                href: "#",
              }));

              level2Mapped["subCategories"] = level3CategoriesMapped;
            }
            return level2Mapped;
          });
          level1Mapped["menuData"] = { categories: level2CategoriesMapped };
        } else if (maxDepth == 1) {
          const categories =
            level2Categories.length > 12 ? level2Categories.slice(0, 12) : level2Categories;
          //
          const level2CategoriesMapped = categories.map((level2Category) => {
            const level2Name = level2Category.name;
            const level2Icon = level2Category.icon;
            //
            const level2Mapped = {
              title: level2Name,
              icon: level2Icon,
              href: "#",
              menuComponent: "MegaMenu2",
            };
            return level2Mapped;
          });
          level1Mapped["menuData"] = level2CategoriesMapped;
        }
        return level1Mapped;
      });

      mapped["menuData"] = level1CategoriesMapped;
    } else if (maxDepth > 1) {
      // Available level 1 or level 2
      const categories =
        level1Categories.length > 8 ? level1Categories.slice(0, 8) : level1Categories;
      //
      const level1CategoriesMapped = categories.map((level1Category) => {
        const level1Name = level1Category.name;
        const level1Icon = level1Category.icon;
        const level2Categories =
          level1Category.subCategories.length > 6
            ? level1Category.subCategories.slice(0, 6)
            : level1Category.subCategories;

        const level2CategoriesMapped = level2Categories.map((level2Category) => ({
          title: level2Category.name,
          icon: level2Category.icon,
          href: "#",
        }));
        //
        return {
          title: level1Name,
          icon: level1Icon,
          href: "#",
          subCategories: level2CategoriesMapped,
        };
      });
      mapped["menuData"] = { categories: level1CategoriesMapped };
    }
    return mapped;
  });

  return (
    <Wrapper open={open} position={position}>
      {mappedCategories.map((item) => {
        let MegaMenu = megaMenu[item.menuComponent];
        return (
          <CategoryMenuItem
            key={item.title}
            href={item.href}
            icon={item.icon}
            title={item.title}
            caret={!!item.menuData}
          >
            <MegaMenu data={item.menuData || {}} />
          </CategoryMenuItem>
        );
      })}
    </Wrapper>
  );
};

export default CategoryMenuCard;
