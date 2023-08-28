"use client";

import { Box, Card, Checkbox, Divider, FormControlLabel, Rating, TextField } from "@mui/material";
// GLOBAL CUSTOM COMPONENTS
import Accordion from "components/accordion/accordion";
import { FlexBetween, FlexBox } from "components/flex-box";
import { H5, H6, Paragraph, Span } from "components/Typography";
import AccordionHeader from "components/accordion/accordion-header";

// FILTER OPTIONS
const categoryList = [
  { title: "Bath Preparations", subCategories: ["Bubble Bath", "Bath Capsules", "Others"] },
  { title: "Eye Makeup Preparations" },
  { title: "Fragrance" },
  { title: "Hair Preparations" },
];

const brandList = ["Mac", "Karts", "Baals", "Bukks", "Luasis"];
const otherOptions = ["On Sale", "In Stock", "Featured"];
const colorList = ["#1C1C1C", "#FF7A7A", "#FFC672", "#84FFB5", "#70F6FF", "#6B7AFF"];

const ProductFilterCard = () => {
  return (
    <Card sx={{ p: "18px 27px", overflow: "auto" }} elevation={1}>
      {/* CATEGORY VARIANT FILTER */}
      <H6 mb={1.25}>Categories</H6>

      {categoryList.map((item) =>
        item.subCategories ? (
          <Accordion key={item.title} expanded>
            <AccordionHeader sx={{ padding: ".5rem 0" }} color="grey.600">
              <Span sx={{ cursor: "pointer", mr: "9px" }}>{item.title}</Span>
            </AccordionHeader>

            {item.subCategories.map((name) => (
              <Paragraph
                pl="22px"
                py={0.75}
                key={name}
                fontSize="14px"
                color="grey.600"
                sx={{ cursor: "pointer" }}
              >
                {name}
              </Paragraph>
            ))}
          </Accordion>
        ) : (
          <Paragraph
            key={item.title}
            sx={{ py: 0.75, cursor: "pointer", color: "grey.600", fontSize: 14 }}
          >
            {item.title}
          </Paragraph>
        )
      )}

      <Box component={Divider} my={3} />

      {/* PRICE VARIANT FILTER */}
      <H6 mb={2}>Price Range</H6>

      <FlexBetween>
        <TextField placeholder="0" type="number" size="small" fullWidth />
        <H5 color="grey.600" px={1}>
          -
        </H5>
        <TextField placeholder="250" type="number" size="small" fullWidth />
      </FlexBetween>

      <Box component={Divider} my={3} />

      {/* BRAND VARIANT FILTER */}
      <H6 mb={2}>Brands</H6>

      {brandList.map((item) => (
        <FormControlLabel
          key={item}
          sx={{ display: "flex" }}
          label={<Span color="inherit">{item}</Span>}
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
      <H6 mb={2}>Colors</H6>

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
      </FlexBox>
    </Card>
  );
};

export default ProductFilterCard;
