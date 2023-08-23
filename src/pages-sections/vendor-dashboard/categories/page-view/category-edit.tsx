"use client";

import Box from "@mui/material/Box";
import * as yup from "yup";
// GLOBAL CUSTOM COMPONENT
import { H3 } from "components/Typography";
// Local CUSTOM COMPONENT
import CategoryForm from "../category-form";

const EditCategoryPageView = () => {
  const INITIAL_VALUES = {
    name: "",
    parent: [],
    featured: false,
  };

  // FORM FIELDS VALIDATION
  const VALIDATION_SCHEMA = yup.object().shape({
    name: yup.string().required("required"),
  });

  const handleFormSubmit = () => {};

  return (
    <Box py={4}>
      <H3 mb={2}>Edit Category</H3>

      <CategoryForm
        initialValues={INITIAL_VALUES}
        handleFormSubmit={handleFormSubmit}
        validationSchema={VALIDATION_SCHEMA}
      />
    </Box>
  );
};

export default EditCategoryPageView;
