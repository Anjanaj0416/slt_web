import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// LOCAL CUSTOM COMPONENTS
import SearchResult from "./search-result";
import CategoryDropdown from "./category-dropdown";
// LOCAL CUSTOM HOOKS
import useSearch from "./use-search";
// STYLED COMPONENT
import { SearchOutlinedIcon } from "./styled";
import { useRouter } from "next/navigation";

interface Props {
  searchBarOpen: boolean;
  toggleSearchBar: () => void;
}
const SearchInputWithCategory = ({ searchBarOpen, toggleSearchBar }: Props) => {
  const router = useRouter();
  const {
    categoryTitle,
    categoryId,
    handleCategoryChange,
    handleSearch,
    parentRef,
    resultList,
  } = useSearch();

  const INPUT_PROPS = {
    sx: {
      height: 44,
      paddingRight: 0,
      borderRadius: 300,
      color: "grey.700",
      overflow: "hidden",
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "primary.main",
      },
    },
    startAdornment: <SearchOutlinedIcon fontSize="small" />,
    endAdornment: (
      <CategoryDropdown
        title={categoryTitle}
        handleChange={handleCategoryChange}
      />
    ),
  };
  const handleOnKeyUp = (event) => {
    if (event.key === "Enter") {
      router.push(
        categoryId == "*"
          ? `/products/search/${event.target.value.replace("/", "")}`
          : `/products/search/${event.target.value.replace("/", "")}?categoryId=${categoryId}`
      );
    }
  };
  return (
    <Box
      position="relative"
      flex="1 1 0"
      maxWidth="670px"
      mx="auto"
      {...{ ref: parentRef }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Searching for..."
        onChange={handleSearch}
        onKeyUp={handleOnKeyUp}
        InputProps={INPUT_PROPS}
      />

      {/* SHOW SEARCH RESULT LIST */}
      {resultList.length > 0 ? (
        <SearchResult
          results={resultList}
          categoryId={categoryId}
          searchBarOpen={searchBarOpen}
          toggleSearchBar={toggleSearchBar}
        />
      ) : null}
    </Box>
  );
};

export default SearchInputWithCategory;
