import { Box, Button, Tooltip } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ShareIcon from "@mui/icons-material/Share";

interface Props {
  isQuotation: boolean;
  isLoading: boolean;
  disabled: boolean;
  onAdd: () => void;
  onBuy: () => void;
  onQuote: () => void;
  onShare: () => void;
}

const ActionButtons = ({
  isQuotation,
  isLoading,
  disabled,
  onAdd,
  onBuy,
  onQuote,
  onShare,
}: Props) => (
  <Box display="flex" alignItems="center" mb={4.5}>
    <LoadingButton
      color="primary"
      loading={isLoading}
      disabled={isQuotation ? false : disabled}
      onClick={isQuotation ? onQuote : onAdd}
      sx={{ px: "1.75rem", height: 40, width: 140, border: 1 }}
    >
      {isQuotation ? "Get Quote" : "Add to Cart"}
    </LoadingButton>

    {!isQuotation && (
      <Button
        color="primary"
        variant="contained"
        disabled={disabled}
        onClick={onBuy}
        sx={{ px: "1.75rem", height: 40, ml: 1.5, width: 136 }}
      >
        Buy Now
      </Button>
    )}

    <Tooltip title="Share">
      <Button sx={{ height: 40, ml: 1 }} onClick={onShare}>
        <ShareIcon />
      </Button>
    </Tooltip>
  </Box>
);

export default ActionButtons;
