import { FC } from "react";
import MegaMenu3 from "./mega-menu-3";
import StyledMegaMenu from "./StyledMegaMenu";
// GLOBAL CUSTOM COMPONENTS
import BazaarCard from "components/BazaarCard";
import CategoryMenuItem from "../category-menu-item";
import { ENVIRONMENT } from "config";
import { NavLink } from "components/nav-link";

// =======================================================================
type Data = {
  icon: string;
  href: string;
  title: string;
  subCategories?: any;
};
export type MegaMenu2Props = { data: Data[] };
// =======================================================================

const MegaMenu2: FC<MegaMenu2Props> = ({ data }) => {
  return (
    <StyledMegaMenu>
      <BazaarCard
        elevation={2}
        sx={{ ml: "1rem", py: "0.5rem", minHeight: 400 }}
      >
        {data?.map((item) => (
          <CategoryMenuItem
            href={item.href}
            icon={
              item.icon
                ? `${ENVIRONMENT.S3_BUCKET_URL}/${item.icon}`
                : `${ENVIRONMENT.APP_URL}/assets/svg/default-category-icon.svg`
            }
            key={item.title}
            title={item.title}
            caret={!!item.subCategories}
          >
            {item.subCategories &&
              (item.subCategories.categories ? (
                <MegaMenu3 minWidth="560px" data={item.subCategories} />
              ) : (
                <MegaMenu2
                  data={item.subCategories || []}
                />
              ))}
          </CategoryMenuItem>
        ))}
        {/* {moreSubCategories && (
          <NavLink
            style={{ color: "orange", textAlign: "center" }}
            className="child-link"
            href="#"
          >
            More Categories
          </NavLink>
        )} */}
      </BazaarCard>
    </StyledMegaMenu>
  );
};

export default MegaMenu2;
