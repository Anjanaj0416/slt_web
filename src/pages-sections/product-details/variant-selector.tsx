import { Box, Chip } from "@mui/material";
import { H6 } from "components/Typography";
import { MappedAttribute, AttributeState } from "./hooks/useProductIntro";

interface Props {
  mappedAttributes: MappedAttribute[];
  selectedAttributes: AttributeState[];
  onSelect: (name: string, value: string) => void;
}

const VariantSelector = ({
  mappedAttributes,
  selectedAttributes,
  onSelect,
}: Props) => (
  <>
    {mappedAttributes.map((attr) => (
      <Box key={attr.id} mb={2}>
        <H6 sx={{ textTransform: "capitalize" }} mb={1}>
          {attr.title}
        </H6>
        {attr.values.map((v, i) => {
          const selected = selectedAttributes.some((a) => a.value === v.value);
          return (
            <Chip
              key={i}
              label={v.value}
              disabled={v.disabled}
              onClick={() => onSelect(attr.title, v.value)}
              color={selected ? "primary" : "default"}
              sx={{
                borderRadius: "4px",
                mr: 1,
                cursor: "pointer",
                textTransform: "capitalize",
              }}
            />
          );
        })}
      </Box>
    ))}
  </>
);

export default VariantSelector;
