import { FC, SyntheticEvent } from "react";
import { FormControlLabel, Radio } from "@mui/material";
import { Paragraph } from "components/Typography";

// ==============================================================
interface Props {
  name: string;
  title: string;
  checked: boolean;
  handleChange: (event: SyntheticEvent<Element, Event>, checked: boolean) => void;
}
// ==============================================================

const FormLabel: FC<Props> = ({ name, checked, title, handleChange }) => {
  return (
    <FormControlLabel
      name={name}
      onChange={handleChange}
      label={<Paragraph fontWeight={600}>{title}</Paragraph>}
      control={<Radio checked={checked} color="primary" size="small" />}
    />
  );
};

export default FormLabel;
