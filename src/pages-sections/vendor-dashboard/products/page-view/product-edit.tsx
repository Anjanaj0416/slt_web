"use client";

import Box from "@mui/material/Box";
import * as yup from "yup";
// GLOBAL CUSTOM COMPONENT
import { H3 } from "components/Typography";
// Local CUSTOM COMPONENT
import ProductForm from "../product-form";

const EditProductPageView = () => {
  const INITIAL_VALUES = {
    name: "",
    tags: "",
    stock: "",
    price: 0,
    category: [],
    sale_price: "",
    description: "",
  };

  // form field validation schema
  const VALIDATION_SCHEMA = yup.object().shape({
    name: yup.string().required("required"),
    category: yup.array().min(1).required("required"),
    description: yup.string().required("required"),
    stock: yup.number().required("required"),
    price: yup.number().required("required"),
    sale_price: yup.number().required("required"),
    tags: yup.string().required("required"),
  });

  const handleFormSubmit = () => {};

  return (
    <Box py={4}>
      <H3 mb={2}>Edit Product</H3>

      <ProductForm
        initialValues={INITIAL_VALUES}
        validationSchema={VALIDATION_SCHEMA}
        handleFormSubmit={handleFormSubmit}
      />
    </Box>
  );
};

export default EditProductPageView;
