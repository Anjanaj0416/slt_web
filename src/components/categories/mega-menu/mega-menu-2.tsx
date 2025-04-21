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
  moreSubCategories?: boolean;
  menuData?: any;
};
export type MegaMenu2Props = { data: Data[]; moreSubCategories?: boolean };
// =======================================================================

const MegaMenu2: FC<MegaMenu2Props> = ({ data, moreSubCategories }) => {
  return (
    <StyledMegaMenu>
      <BazaarCard elevation={2} sx={{ ml: "1rem", py: "0.5rem", minHeight:400 }}>
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
            caret={!!item.menuData}
          >
            {item.menuData &&
              (item.menuData.categories ? (
                <MegaMenu3 minWidth="560px" data={item.menuData} />
              ) : (
                <MegaMenu2
                  data={item.menuData || []}
                  
                  moreSubCategories={item.moreSubCategories}
                />
              ))}
          </CategoryMenuItem>
        ))}
        {moreSubCategories && (
          <NavLink
            style={{ color: "orange", textAlign: "center" }}
            className="child-link"
            href="#"
          >
            More Categories
          </NavLink>
        )}
      </BazaarCard>
    </StyledMegaMenu>
  );
};

export default MegaMenu2;
