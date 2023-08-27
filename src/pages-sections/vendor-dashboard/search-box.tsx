import { FC } from "react";
import Add from "@mui/icons-material/Add";
import { Button, Theme, useMediaQuery } from "@mui/material";
// GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
import SearchInput from "components/SearchInput";

// ===============================================================
type Props = {
  buttonText: string;
  handleSearch: () => void;
  searchPlaceholder: string;
  handleBtnClick: () => void;
};
// ===============================================================

const SearchArea: FC<Props> = ({
  searchPlaceholder = "Search Product...",
  buttonText = "Add Product",
  handleBtnClick,
}) => {
  const downSM = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  return (
    <FlexBox mb={2} gap={2} justifyContent="space-between" flexWrap="wrap">
      <SearchInput placeholder={searchPlaceholder} />

      <Button
        color="info"
        fullWidth={downSM}
        variant="contained"
        startIcon={<Add />}
        onClick={handleBtnClick}
        sx={{ minHeight: 44 }}
      >
        {buttonText}
      </Button>
    </FlexBox>
  );
};

export default SearchArea;
