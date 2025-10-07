import {
  Modal,
  Backdrop,
  Fade,
  Box,
  Stack,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import { Close } from "@mui/icons-material";

interface SelfPickupInfoModalProps {
  open: boolean;
  onClose: () => void;
  storeName?: string;
  storeAddress?: string;
}

interface SelfPickupInfoModalProps {
  open: boolean;
  onClose: () => void;
  storeName?: string;
  storeAddress?: string;
}

export default function SelfPickupInfoModal({
  open,
  onClose,
  storeName = "Main Store",
  storeAddress = "123 Main Street, Colombo, Sri Lanka",
}: SelfPickupInfoModalProps) {
  const handleClose = (
    event: unknown,
    reason?: "backdropClick" | "escapeKeyDown"
  ) => {
    // prevent closing when clicking outside or pressing Esc
    if (reason === "backdropClick" || reason === "escapeKeyDown") return;
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      disableEscapeKeyDown
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 300,
          sx: {
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            backgroundColor: "rgba(0,0,0,0.45)",
          },
        },
      }}
      aria-labelledby="self-pickup-modal-title"
      aria-describedby="self-pickup-modal-description"
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 440, md:500 }, 
            maxWidth: "95%",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            p: 3,
            outline: "none",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={1}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <StoreIcon color="primary" />
              <Typography variant="h6" component="h2">
                Self Pickup Information
              </Typography>
            </Stack>

            <IconButton size="small" onClick={onClose}>
              <Close fontSize="small" />
            </IconButton>
          </Stack>

          <Typography variant="body1" mb={2}>
            This is a <strong>Self-Pickup Product</strong>. You should visit the
            store and collect your order in person.
          </Typography>

          <Box
            sx={{
              bgcolor: "grey.100",
              borderRadius: 1,
              p: 2,
              mb: 2,
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              {storeName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {storeAddress}
            </Typography>
          </Box>

          <Stack direction="row" justifyContent="flex-end">
            <Button variant="contained" onClick={onClose}>
              Got it
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
}
