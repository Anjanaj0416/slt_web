import { Typography, Stack } from "@mui/material";

interface ProductDetailsProps {
  description: string;
  specification: string;
}

const ProductDetails = ({ description, specification }: ProductDetailsProps) => (
  <Stack spacing={2}>
    <div>
      <Typography variant="h6">Description</Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </div>
    <div>
      <Typography variant="h6">Specification</Typography>
      <Typography variant="body2" color="text.secondary">
        {specification}
      </Typography>
    </div>
  </Stack>
);

export default ProductDetails;
