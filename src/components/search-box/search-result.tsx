import { FC } from "react";
import Link from "next/link";
import MenuItem from "@mui/material/MenuItem";
// STYLED COMPONENT
import { SearchResultCard } from "./styled";
import StoreProductSearch from "../../models/StoreProductSearch.model";
import { Avatar } from "@mui/material";
import { ENVIRONMENT } from "config";

// ==============================================================
type Props = {
  categoryId?: string;
  results: StoreProductSearch[];
};
// ==============================================================

const SearchResult: FC<Props> = ({ categoryId, results }) => (
  <SearchResultCard elevation={2}>
    {results.map((item) => (
      <Link
        href={
          item.type === "PRODUCT"
            ? categoryId == "*"
              ? `/products/search/${item.name}`
              : `/products/search/${item.name}?categoryId=${categoryId}`
            : `/shops/${item.id}`
        }
        key={item.id}
      >
        {item.type === "STORE" ? (
          <MenuItem
            key={item.name}
            sx={{
              borderBottom: "1px solid",
              borderBottomColor: "secondary.100",
            }}
          >
            <Avatar
              alt={item.name}
              src={`${ENVIRONMENT.S3_BUCKET_URL}/${item.imageUrl}`}
              sx={{
                marginRight: "8px",
                borderRadius: "10px",
                height: 36,
                width: { sm: 36, xs: "100%" },
              }}
            />
            {item.name}
          </MenuItem>
        ) : (
          <MenuItem key={item.name}>{item.name}</MenuItem>
        )}
      </Link>
    ))}
  </SearchResultCard>
);

export default SearchResult;
