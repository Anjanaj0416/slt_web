"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import styled from "@mui/material/styles/styled";
// Local CUSTOM COMPONENTS
import ProductReview from "./product-review";
import ProductDescription from "./product-description";
import ProductSpecification from "./product-specification";

// STYLED COMPONENT
const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 0,
  marginTop: 80,
  marginBottom: 24,
  borderBottom: `1px solid ${theme.palette.text.disabled}`,
  "& .inner-tab": {
    minHeight: 40,
    fontWeight: 600,
    textTransform: "capitalize",
  },
}));
type Props = {
  description: string;
  specification: string;
  productId: string;
};
const ProductTabs = ({ description, specification, productId }: Props) => {
  const [selectedOption, setSelectedOption] = useState(0);
  const handleOptionClick = (_, value: number) => setSelectedOption(value);

  return (
    <>
      <StyledTabs
        textColor="primary"
        value={selectedOption}
        indicatorColor="primary"
        onChange={handleOptionClick}
      >
        <Tab className="inner-tab" label="Description" />
        <Tab className="inner-tab" label="Specification" />
        <Tab className="inner-tab" label="Review" />
      </StyledTabs>

      <Box mb={6}>
        {selectedOption === 0 && (
          <ProductDescription description={description} />
        )}
        {selectedOption === 1 && (
          <ProductSpecification specification={specification} />
        )}
        {selectedOption === 2 && <ProductReview productId={productId} />}
      </Box>
    </>
  );
};

export default ProductTabs;
