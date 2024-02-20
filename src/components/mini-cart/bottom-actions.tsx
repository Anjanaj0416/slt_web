import { FC } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useCartService from "hooks/useCartService";

// ==============================================================
interface Props {
  total: string;
  handleNavigate: (path: string) => () => void;
}
// ==============================================================

const BottomActions: FC<Props> = ({ total, handleNavigate }) => {
  const { isLoading } = useCartService();
  return (
    <Box p={2.5}>
      <Button
        fullWidth
        color="primary"
        variant="contained"
        sx={{ mb: "0.75rem", height: "40px" }}
        onClick={handleNavigate("/checkout")}
        disabled={isLoading}
      >
        Checkout Now ({total})
      </Button>

      <Button
        fullWidth
        color="primary"
        variant="outlined"
        sx={{ height: 40 }}
        onClick={handleNavigate("/cart")}
        disabled={isLoading}
      >
        View Cart
      </Button>
    </Box>
  );
};

export default BottomActions;
