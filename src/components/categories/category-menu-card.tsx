import { FC } from "react";
import Box from "@mui/material/Box";
import styled from "@mui/material/styles/styled";
import MegaMenu2 from "./mega-menu/mega-menu-2";
import CategoryMenuItem from "./category-menu-item";
import Container from "@mui/material/Container";
import { ENVIRONMENT } from "config";
import useCategories from "./use-categories";

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
  const { categories, isLoading } = useCategories();

  if (isLoading || !categories) {
    return (
      <Wrapper open={open} position={position}>
        <Container>Loading</Container>
      </Wrapper>
    );
  }
  //
  return (
    <Wrapper open={open} position={position}>
      {categories?.map((item) => {
        //let MegaMenu = megaMenu[item.menuComponent];
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
            caret={!!item.subCategories}
          >
            <MegaMenu2 data={item.subCategories || []} />
          </CategoryMenuItem>
        );
      })}
      {/* {data?.totalPages > 1 && (
        <NavLink
          style={{ color: "orange", textAlign: "center" }}
          className="child-link"
          href="#"
        >
          More Categories
        </NavLink>
      )} */}
    </Wrapper>
  );
};

export default CategoryMenuCard;
