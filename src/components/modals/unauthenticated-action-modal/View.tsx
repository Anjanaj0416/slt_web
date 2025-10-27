"use client";

import { Modal, Stack, Typography, Button, Box, Fade } from "@mui/material";
import { signIn } from "next-auth/react";
import React from "react";
import { FlexBox } from "components/flex-box";

type Props = {
  isOpen: boolean;
  handleClose: VoidFunction;
};

const View = ({ isOpen, handleClose }: Props) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: "blur(12px)",
        backgroundColor: "rgba(0, 0, 0, 0.35)",
      }}
    >
      <Fade in={isOpen} timeout={300}>
        <Box
          sx={{
            p: 4,
            borderRadius: 3,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(20px)",
            minWidth: 380,
            maxWidth: "90%",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <Stack spacing={3} alignItems="center">
            <Typography
              variant="h5"
              fontWeight={600}
              textAlign="center"
              color="error"
            >
              Welcome Back
            </Typography>

            <Typography
              variant="body1"
              textAlign="center"
              color="text.secondary"
            >
              Please log in to continue your shopping.
            </Typography>

            <FlexBox gap={2} justifyContent="center">
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleClose}
                sx={{
                  borderRadius: 1,
                  textTransform: "none",
                  px: 3,
                  borderColor: "rgba(0,0,0,0.2)",
                  "&:hover": {
                    borderColor: "rgba(0,0,0,0.4)",
                    background: "rgba(0,0,0,0.03)",
                  },
                }}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                sx={{
                  borderRadius: 1,
                  textTransform: "none",
                  px: 3,
                }}
                color="error"
                onClick={() =>
                  void signIn("keycloak", {
                    callbackUrl: window.location.href || "/",
                  })
                }
              >
                Login
              </Button>
            </FlexBox>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

export default View;
