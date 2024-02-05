import { Modal, Stack, Typography, Button } from "@mui/material";
import { FlexBox } from "components/flex-box";
import { signIn } from "next-auth/react";
import React from "react";
//
type Props = {
  isOpen: boolean;
  handleClose: VoidFunction;
};
//
const View = ({ isOpen, handleClose }: Props) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Stack sx={{ background: "white", p: 3, borderRadius: 1 }} spacing={4}>
        <Typography variant="h4">Welcome! Please Login to continue.</Typography>
        <FlexBox gap={2} justifyContent={"flex-end"}>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="info"
            onClick={() => void signIn("keycloak", { callbackUrl: "/" })}
          >
            Login
          </Button>
        </FlexBox>
      </Stack>
    </Modal>
  );
};
//
export default View;
