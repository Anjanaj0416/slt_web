"use client";

import Box from "@mui/material/Box";
import * as yup from "yup";
// GLOBAL CUSTOM COMPONENT
import { H3 } from "components/Typography";
// Local CUSTOM COMPONENT
import CategoryForm from "../category-form";

const CreateCategoryPageView = () => {
  const INITIAL_VALUES = {
    name: "",
    parent: [],
    featured: false,
  };

  // form field validation schema
  const validationSchema = yup.object().shape({
    name: yup.string().required("required"),
  });

  const handleFormSubmit = () => {};

  return (
    <Box py={4}>
      <H3 mb={2}>Create Category</H3>

      <CategoryForm
        initialValues={INITIAL_VALUES}
        validationSchema={validationSchema}
        handleFormSubmit={handleFormSubmit}
      />
    </Box>
  );
};

export default CreateCategoryPageView;
