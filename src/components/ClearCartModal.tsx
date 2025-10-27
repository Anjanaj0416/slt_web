import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  onClearCart: () => void;
  message: string;
}

const ClearCartModal: React.FC<Props> = ({
  open,
  onClose,
  onClearCart,

  message,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      closeAfterTransition
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: "blur(12px)",
        backgroundColor: "rgba(0, 0, 0, 0.35)",
      }}
    >
      <DialogTitle>Mixed Cart Items</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{message}</Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Do you want to clear the cart and continue?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          disableElevation
          onClick={onClose}
          variant="outlined"
          color="error"
          sx={{ textTransform: "capitalize" }}
        >
          Cancel
        </Button>
        <Button
          disableElevation
          onClick={() => {
            onClearCart();
            onClose();
          }}
          color="error"
          variant="contained"
          sx={{ textTransform: "capitalize" }}
        >
          Clear Cart & Add Item
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClearCartModal;
