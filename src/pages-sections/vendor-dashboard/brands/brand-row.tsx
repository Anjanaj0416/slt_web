import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar";
import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
// GLOBAL CUSTOM COMPONENT
import BazaarSwitch from "components/BazaarSwitch";
// STYLED COMPONENTS
import { StyledIconButton, StyledTableCell, StyledTableRow } from "../../admin/StyledComponents";

// ========================================================================
type Props = { brand: any; selected: any[] };
// ========================================================================

const BrandRow: FC<Props> = ({ brand, selected }) => {
  const { name, featured, logo, id, slug } = brand;

  const router = useRouter();
  const [featuredCategory, setFeaturedCategory] = useState(featured);
  const isItemSelected = selected.indexOf(name) !== -1;

  const handleNavigate = () => router.push(`/vendor/categories/${slug}`);

  return (
    <StyledTableRow tabIndex={-1} role="checkbox" selected={isItemSelected}>
      <StyledTableCell align="center">#{id.split("-")[0]}</StyledTableCell>

      <StyledTableCell align="center">{name}</StyledTableCell>

      <StyledTableCell align="center">
        <Avatar src={logo} sx={{ width: 55, height: "auto", margin: "auto", borderRadius: 0 }} />
      </StyledTableCell>

      <StyledTableCell align="center">
        <BazaarSwitch
          color="info"
          checked={featuredCategory}
          onChange={() => setFeaturedCategory((state: boolean) => !state)}
        />
      </StyledTableCell>

      <StyledTableCell align="center">
        <StyledIconButton onClick={handleNavigate}>
          <RemoveRedEye />
        </StyledIconButton>

        <StyledIconButton>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default BrandRow;
