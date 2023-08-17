import { FC, PropsWithChildren } from "react";
import Button, { ButtonProps } from "@mui/material/Button";

// ==================================================
interface Props extends PropsWithChildren, ButtonProps {}
// ==================================================

const WhiteButton: FC<Props> = ({ children, ...props }) => {
  return (
    <Button
      color="dark"
      variant="contained"
      sx={{
        color: "dark.main",
        backgroundColor: "white",
        ":hover": {
          color: "#fff",
          backgroundColor: "dark.main",
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default WhiteButton;
