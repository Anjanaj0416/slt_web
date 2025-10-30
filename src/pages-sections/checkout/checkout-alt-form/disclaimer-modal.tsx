import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";

interface DisclaimerModalProps {
  open: boolean;
  onClose: () => void;
  onAgree: () => void;
}

const DisclaimerModal: React.FC<DisclaimerModalProps> = ({
  open,
  onClose,
  onAgree,
}) => {
  const [checked, setChecked] = useState(false);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, p: 2 },
      }}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: "blur(12px)",
        backgroundColor: "rgba(0, 0, 0, 0.35)",
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 600,
          fontSize: "1.25rem",
          textAlign: "center",
          borderBottom: "1px solid #e0e0e0",
          pb: 1,
        }}
      >
        Disclaimer & Agreement
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            By placing an order on <strong>Tradez</strong>, you acknowledge and
            agree to the following:
          </Typography>

          <Typography variant="body2">
            • Tradez acts as a marketplace connecting buyers and sellers (both
            B2B & B2C). Product descriptions, prices, and availability are
            provided by the respective sellers.
          </Typography>

          <Typography variant="body2">
            • Tradez is not responsible for the quality, safety, legality, or
            authenticity of products listed by sellers.
          </Typography>

          <Typography variant="body2">
            • Buyers must carefully review product details, prices, and seller
            ratings before making a purchase.
          </Typography>

          <Typography variant="body2">
            • Tradez shall not be held liable for any direct, indirect, or
            consequential damages arising from transactions between buyers and
            sellers.
          </Typography>

          <Typography variant="body2">
            • Any disputes regarding product quality, delivery, or warranty must
            be resolved directly with the seller, in accordance with Tradez’s
            policies.
          </Typography>

          <Typography variant="body2">
            By confirming your order, you agree to our{" "}
            <strong>Terms & Conditions</strong>, <strong>Privacy Policy</strong>
            , and this <strong>Disclaimer</strong>.
          </Typography>

          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                color="primary"
              />
            }
            label="I have read and agree to the terms above."
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", pt: 2 }}>
        <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 2 }}>
          Cancel
        </Button>
        <Button
          onClick={onAgree}
          disabled={!checked}
          variant="contained"
          sx={{ borderRadius: 2 }}
        >
          Agree & Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DisclaimerModal;
