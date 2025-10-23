import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Stack,
  Snackbar,
  Tooltip,
  Backdrop,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CloseIcon from "@mui/icons-material/Close";

export interface ShareModalRef {
  openModal: (url: string) => void;
  closeModal: () => void;
}

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
  minWidth: 320,
  maxWidth: "90vw",
};

const ShareModal = forwardRef<ShareModalRef>((_, ref) => {
  const [url, setUrl] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    openModal: (url: string) => setUrl(url),
    closeModal: () => setUrl(""),
  }));

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(url);
    setSnackbarOpen(true);
  };

  return (
    <>
      <Modal
        open={!!url}
        onClose={() => setUrl("")}
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
      >
        <Box sx={modalStyle}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Share with others</Typography>
            <IconButton onClick={() => setUrl("")}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Stack direction="row" spacing={3} justifyContent="center" mt={3}>
            <Tooltip title="Share on Facebook">
              <IconButton
                color="primary"
                onClick={() =>
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      url
                    )}`,
                    "_blank"
                  )
                }
              >
                <FacebookIcon fontSize="large" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Share on X (Twitter)">
              <IconButton
                color="primary"
                onClick={() =>
                  window.open(
                    `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      url
                    )}`,
                    "_blank"
                  )
                }
              >
                <TwitterIcon fontSize="large" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Share on WhatsApp">
              <IconButton
                sx={{ color: "#25D366" }}
                onClick={() =>
                  window.open(
                    `https://wa.me/?text=${encodeURIComponent(url)}`,
                    "_blank"
                  )
                }
              >
                <WhatsAppIcon fontSize="large" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Copy link">
              <IconButton onClick={handleCopyLink}>
                <ContentCopyIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </Stack>

          <Typography
            variant="body2"
            align="center"
            mt={2}
            color="text.secondary"
          >
            Share this product with other
          </Typography>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Link copied to clipboard"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
});

export default ShareModal;
