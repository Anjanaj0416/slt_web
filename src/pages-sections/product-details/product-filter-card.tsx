"use client";
import {
  BaseSyntheticEvent,
  ChangeEvent,
  Dispatch,
  Fragment,
  useRef,
  useState,
} from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
// GLOBAL CUSTOM COMPONENTS
import { FlexBetween } from "components/flex-box";
import { H5, H6, Paragraph, Span } from "components/Typography";
import AccordionHeader from "components/accordion/accordion-header";
import Category1 from "models/Category.model";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

// const otherOptions = ["On Sale", "In Stock"];
// const colorList = [
//   "#1C1C1C",
//   "#FF7A7A",
//   "#FFC672",
//   "#84FFB5",
//   "#70F6FF",
//   "#6B7AFF",
// ];

type Props = {
  categoryId: string;
  categories: Category1[];
  isLoading: boolean;
  brands: string[];
  setCategoryId: (id: string) => void;
  setBrands: Dispatch<React.SetStateAction<string[]>>;
  setPage: (page: number) => void;
  setMinPrice: (page: number) => void;
  setMaxPrice: (page: number) => void;
};

const ProductFilterCard = ({
  categoryId,
  categories,
  brands,
  isLoading,
  setCategoryId,
  setPage,
  setBrands,
  setMaxPrice,
  setMinPrice,
}: Props) => {
  const [collapsed, setCollapsed] = useState(true);
  const minPriceRef = useRef<HTMLInputElement>(null);
  const maxPriceRef = useRef<HTMLInputElement>(null);
  const handleCategoryClick = (id: string) => {
    setPage(0);
    if (id === categoryId) {
      setCategoryId(null);
    } else {
      setCategoryId(id);
    }
  };
  const handleBrandClick = (event: BaseSyntheticEvent, brand: string) => {
    setPage(0);
    if (event.target.checked) {
      setBrands((prvState) => (prvState ? [...prvState, brand] : [brand]));
    } else {
      setBrands((prvState) => {
        return prvState.filter((e) => e !== brand);
      });
    }
  };

  const handlePriceFilter = () => {
    const minPriceValue = minPriceRef.current?.value || 0;
    const maxPriceValue = maxPriceRef.current?.value || 0;
    setPage(0);
    setMinPrice(+minPriceValue);
    setMaxPrice(+maxPriceValue);
  };

  return (
    <Card sx={{ p: "18px 27px", overflow: "auto" }} elevation={1}>
      {/* CATEGORY VARIANT FILTER */}
      <H6 mb={1.25}>Categories</H6>

      {categories.map((item) =>
        item.subCategories ? (
          <Fragment key={item.id}>
            <AccordionHeader
              open={collapsed}
              onClick={() => setCollapsed((state) => !state)}
              color={
                item.subCategories.find((e) => e.id === categoryId)
                  ? "primary.main"
                  : "grey.600"
              }
              sx={{ padding: ".5rem 0", cursor: "pointer" }}
            >
              <Span>{item.name}</Span>
            </AccordionHeader>

            <Collapse in={collapsed}>
              {item.subCategories.map((subCategory) => (
                <Paragraph
                  onClick={() => handleCategoryClick(subCategory.id)}
                  pl="22px"
                  py={0.75}
                  key={subCategory.id}
                  fontSize="14px"
                  color={
                    subCategory.id === categoryId ? "primary.main" : "grey.600"
                  }
                  sx={{ cursor: "pointer" }}
                >
                  {subCategory.name}
                </Paragraph>
              ))}
            </Collapse>
          </Fragment>
        ) : (
          <Paragraph
            key={item.id}
            onClick={() => handleCategoryClick(item.id)}
            color={item.id === categoryId ? "primary.main" : "grey.600"}
            sx={{
              py: 0.75,
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            {item.name}
          </Paragraph>
        )
      )}

      <Box component={Divider} my={3} />

      {/* PRICE VARIANT FILTER */}
      <H6 mb={2}>Price Range</H6>

      <FlexBetween>
        <TextField
          placeholder="0"
          type="number"
          size="small"
          inputRef={minPriceRef}
          fullWidth
        />
        <H5 color="grey.600" px={1}>
          -
        </H5>
        <TextField
          placeholder="250"
          inputRef={maxPriceRef}
          type="number"
          size="small"
          fullWidth
        />

        <IconButton
          disabled={isLoading}
          aria-label="Filter Price"
          title="Price Filter"
          sx={{ ml: 0.4 }}
          onClick={handlePriceFilter}
        >
          <PlayArrowIcon />
        </IconButton>
      </FlexBetween>

      <Box component={Divider} my={3} />

      {/* BRAND VARIANT FILTER */}
      <H6 mb={2}>Brands</H6>

      {brands.map((item) => (
        <FormControlLabel
          disabled={isLoading}
          key={item}
          onChange={(event: BaseSyntheticEvent) =>
            handleBrandClick(event, item)
          }
          sx={{ display: "flex" }}
          label={<Span color="inherit">{item}</Span>}
          control={<Checkbox size="small" color="secondary" />}
        />
      ))}

      {/* <Box component={Divider} my={3} /> */}

      {/* SALES OPTIONS */}
      {/* {otherOptions.map((item) => (
        <FormControlLabel
          key={item}
          sx={{ display: "flex" }}
          label={<Span color="inherit">{item}</Span>}
          control={<Checkbox size="small" color="secondary" />}
        />
      ))} */}

      {/* <Box component={Divider} my={3} /> */}

      {/* RATINGS FILTER */}
      {/* <H6 mb={2}>Ratings</H6>
      {[5, 4, 3, 2, 1].map((item) => (
        <FormControlLabel
          key={item}
          control={<Checkbox size="small" color="secondary" />}
          label={<Rating size="small" value={item} color="warn" readOnly />}
          sx={{ display: "flex" }}
        />
      ))} */}

      {/* <Box component={Divider} my={3} /> */}

      {/* COLORS VARIANT FILTER */}
      {/* <H6 mb={2}>Colors</H6>

      <FlexBox mb={2} flexWrap="wrap" gap={1}>
        {colorList.map((item) => (
          <Box
            key={item}
            width={25}
            height={25}
            flexShrink={0}
            bgcolor={item}
            borderRadius="50%"
            sx={{ cursor: "pointer" }}
          />
        ))}
      </FlexBox> */}
    </Card>
  );
};

export default ProductFilterCard;
