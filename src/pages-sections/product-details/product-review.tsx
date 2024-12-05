"use client";

import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import { useFormik } from "formik";
// Local CUSTOM COMPONENT
import ProductComment from "./product-comment";
// GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
import { H2, H5 } from "components/Typography";
import { useGetReviewsQuery, usePostReviewMutation } from "services/review-api";
import { CircularProgress } from "@mui/material";
import { Review1 } from "models/Review.model";
import ENVIRONMENT from "config/environment";
import { useSession } from "next-auth/react";
import { User1 } from "models/User.model";
import { LoadingButton } from "@mui/lab";
import { useEffect } from "react";
import { enqueueSnackbar } from "notistack";

type Props = {
  productId: string;
};
const ProductReview = ({ productId }: Props) => {
  const initialValues = {
    rating: 0,
    text: "",
  };

  const { data: session } = useSession();
  const user = session?.user as User1;

  const { data: reviewsData, isLoading } = useGetReviewsQuery({ productId });
  const [addReview, { isLoading: isAdding, isSuccess }] =
    usePostReviewMutation();

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
      addReview({ userId: user.id, body: { ...values, productId } });
      resetForm();
    },
  });

  useEffect(() => {
    if (isSuccess && !isAdding) {
      enqueueSnackbar("Review successfully added", { variant: "success" });
    }
  }, [isSuccess]);

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        reviewsData.data.map((item: Review1, ind) => (
          <ProductComment
            comment={item.text}
            rating={item.rating}
            name={item.user.firstName}
            imgUrl={`${ENVIRONMENT.S3_BUCKET_URL}/${item.user.profilePictureUrl}`}
            date={item.createdAt.toString()}
            key={ind}
          />
        ))
      )}

      {user?.id && (
        <>
          <H2 fontWeight="600" mt={7} mb={2.5}>
            Write a Review for this product
          </H2>

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
        </>
      )}
    </div>
  );
};

export default ProductReview;
