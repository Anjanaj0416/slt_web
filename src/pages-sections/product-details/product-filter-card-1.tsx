"use client";
import { Fragment, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Rating from "@mui/material/Rating";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import Checkbox from "@mui/material/Checkbox";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
// GLOBAL CUSTOM COMPONENTS
import { FlexBetween } from "components/flex-box";
import { H5, H6, Paragraph, Span } from "components/Typography";
import AccordionHeader from "components/accordion/accordion-header";
import Category1 from "models/Category.model";

const otherOptions = ["On Sale", "In Stock", "Featured"];
const colorList = [
  "#1C1C1C",
  "#FF7A7A",
  "#FFC672",
  "#84FFB5",
  "#70F6FF",
  "#6B7AFF",
];

type Props = {
  categories: Category1[];
  brands: string[];
  filters: string;
  setFilters: any;
};

const ProductFilterCard1 = ({
  categories,
  brands,
  filters,
  setFilters,
}: Props) => {
  const [collapsed, setCollapsed] = useState(true);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const minRef = useRef<TextFieldProps>();
  const maxRef = useRef<TextFieldProps>();

  const handleFilters = () => {
    let text = "";
    if (maxRef.current.value) {
      text += `&maxPrice=${maxRef.current.value}`;
    }
    if (minRef.current?.value) {
      text += `&minPrice=${minRef.current.value}`;
    }
    if (selectedBrands.length > 0) {
      text += `&brand=${selectedBrands.join(",")}`;
    }
    setFilters(`${filters}${text}`);
  };

  const handleBrandSelect = (isSelect, value) => {
    if (isSelect) {
      setSelectedBrands((prvState) => {
        const brands = [...prvState, value];
        return brands;
      });
    } else {
      setSelectedBrands((prvState) => {
        const brands = prvState.filter((e) => e !== value);
        return brands;
      });
    }
    handleFilters();
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
              sx={{ padding: ".5rem 0", cursor: "pointer", color: "grey.600" }}
            >
              <Span>{item.name}</Span>
            </AccordionHeader>

            <Collapse in={collapsed}>
              {item.subCategories.map((category) => (
                <Paragraph
                  pl="22px"
                  py={0.75}
                  key={category.id}
                  fontSize="14px"
                  color="grey.600"
                  sx={{ cursor: "pointer" }}
                >
                  {category.name}
                </Paragraph>
              ))}
            </Collapse>
          </Fragment>
        ) : (
          <Paragraph
            key={item.id}
            sx={{
              py: 0.75,
              cursor: "pointer",
              color: "grey.600",
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
          inputRef={minRef}
          placeholder="0"
          type="number"
          size="small"
          fullWidth
          onChange={handleFilters}
        />
        <H5 color="grey.600" px={1}>
          -
        </H5>
        <TextField
          inputRef={maxRef}
          placeholder="250"
          type="number"
          size="small"
          fullWidth
          onChange={handleFilters}
        />
      </FlexBetween>

      <Box component={Divider} my={3} />

      {/* BRAND VARIANT FILTER */}
      <H6 mb={2}>Brands</H6>

      {brands.map((item) => (
        <FormControlLabel
          key={item}
          sx={{ display: "flex" }}
          label={<Span color="inherit">{item}</Span>}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleBrandSelect(e.target.checked, item)
          }
          control={<Checkbox size="small" color="secondary" />}
        />
      ))}

      <Box component={Divider} my={3} />

      {/* SALES OPTIONS */}
      {otherOptions.map((item) => (
        <FormControlLabel
          key={item}
          sx={{ display: "flex" }}
          label={<Span color="inherit">{item}</Span>}
          control={<Checkbox size="small" color="secondary" />}
        />
      ))}

      <Box component={Divider} my={3} />

      {/* RATINGS FILTER */}
      <H6 mb={2}>Ratings</H6>
      {[5, 4, 3, 2, 1].map((item) => (
        <FormControlLabel
          key={item}
          control={<Checkbox size="small" color="secondary" />}
          label={<Rating size="small" value={item} color="warn" readOnly />}
          sx={{ display: "flex" }}
        />
      ))}

      <Box component={Divider} my={3} />

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

export default ProductFilterCard1;
