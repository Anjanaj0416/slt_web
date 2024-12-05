import { LoadingButton } from "@mui/lab";
import {
  Modal,
  Stack,
  Box,
  TextField,
  Rating,
  IconButton,
} from "@mui/material";
import { FlexBox } from "components/flex-box";
import { H5 } from "components/Typography";
import { useFormik } from "formik";
import { User1 } from "models/User.model";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { usePostReviewMutation } from "services/review-api";
import CloseIcon from "@mui/icons-material/Close";
import * as yup from "yup";
import { useSnackbar } from "notistack";
//
type Props = {
  productId: string;
  isOpen: boolean;
  handleClose: VoidFunction;
};
//
const ReviewModal = ({ isOpen, productId, handleClose }: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const initialValues = {
    rating: 0,
    text: "",
  };

  const { data: session } = useSession();
  const user = session?.user as User1;

  const [addReview, { isLoading: isAdding, isSuccess }] =
    usePostReviewMutation();

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar("Review added successfully!", {
        variant: "success",
      });
      handleClose();
    }
  }, [enqueueSnackbar, isSuccess]);

  const validationSchema = yup.object().shape({
    rating: yup.number().required("required").max(5).min(0),
    text: yup.string().required("required").max(255),
  });
  const {
    dirty,
    values,
    errors,
    touched,
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      await addReview({ userId: user.id, body: { ...values, productId } });
      resetForm();
    },
  });

  const handleModelClose = (
    _event: {},
    reason: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason === "backdropClick") {
      return;
    }
    handleClose();
  };
  return (
    <Modal
      open={isOpen}
      onClose={handleModelClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Stack
        sx={{
          background: "white",
          p: 3,
          borderRadius: 1,
          width: "60%",
          position: "relative",
        }}
      >
        <IconButton
          onClick={isAdding ? null : handleClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 1,
          }}
        >
          <CloseIcon />
        </IconButton>
        <form onSubmit={handleSubmit}>
          <Box mb={2.5}>
            <FlexBox mb={1.5} gap={0.5}>
              <H5 color="grey.700">Your Rating</H5>
              <H5 color="error.main">*</H5>
            </FlexBox>

            <Rating
              color="warn"
              size="medium"
              value={values.rating}
              onChange={(_, value: any) => setFieldValue("rating", value)}
            />
          </Box>

          <Box mb={3}>
            <FlexBox mb={1.5} gap={0.5}>
              <H5 color="grey.700">Your Review</H5>
              <H5 color="error.main">*</H5>
            </FlexBox>

            <TextField
              rows={8}
              multiline
              fullWidth
              name="text"
              variant="outlined"
              onBlur={handleBlur}
              value={values.text}
              onChange={handleChange}
              placeholder="Write a review here..."
              error={!!touched.text && !!errors.text}
              helperText={(touched.text && errors.text) as string}
            />
          </Box>
          <LoadingButton
            loading={isAdding}
            variant="contained"
            color="primary"
            type="submit"
            disabled={!(dirty && isValid && values.rating > 0) || isAdding}
          >
            Submit
          </LoadingButton>
        </form>
      </Stack>
    </Modal>
  );
};
//
export default ReviewModal;
