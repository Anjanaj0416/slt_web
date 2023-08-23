"use client";

import Box from "@mui/material/Box";
import * as yup from "yup";
// GLOBAL CUSTOM COMPONENT
import { H3 } from "components/Typography";
// CUSTOM DATA MODEL
import BrandForm from "../brand-form";

const CreateBrandPageView = () => {
  const INITIAL_VALUES = {
    name: "",
    featured: false,
  };

  // FORM FIELDS VALIDATION SCHEMA
  const VALIDATION_SCHEMA = yup.object().shape({
    name: yup.string().required("required"),
  });

  const handleFormSubmit = () => {};

  return (
    <Box py={4}>
      <H3 mb={2}>Create New Brand</H3>

      <BrandForm
        initialValues={INITIAL_VALUES}
        validationSchema={VALIDATION_SCHEMA}
        handleFormSubmit={handleFormSubmit}
      />
    </Box>
  );
};

export default CreateBrandPageView;
