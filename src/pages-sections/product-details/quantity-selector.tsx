import { Button, Stack } from "@mui/material";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import { H3 } from "components/Typography";

interface Props {
  selectedQuantity: number;
  quantity?: number;
  maxBuyableQuantity?: number;
  onChange: (value: number) => void;
}

const QuantitySelector = ({
  selectedQuantity,
  maxBuyableQuantity,
  quantity = 0,
  onChange,
}: Props) => (
  <Stack direction="row" alignItems="center" spacing={2}>
    <Button
      disabled={selectedQuantity < 2}
      onClick={() => onChange(selectedQuantity - 1)}
      size="small"
      sx={{ p: 1 }}
      color="primary"
      variant="outlined"
    >
      <Remove fontSize="small" />
    </Button>
    <H3>{selectedQuantity}</H3>
    <Button
      disabled={
        quantity <= selectedQuantity ||
        (maxBuyableQuantity && selectedQuantity >= maxBuyableQuantity)
      }
      onClick={() => onChange(selectedQuantity + 1)}
      size="small"
      sx={{ p: 1 }}
      color="primary"
      variant="outlined"
    >
      <Add fontSize="small" />
    </Button>
  </Stack>
);

export default QuantitySelector;
