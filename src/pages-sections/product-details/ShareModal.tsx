import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Modal, Box } from "@mui/material";
import { ShareSocial } from "react-share-social";

export interface ShareModalRef {
  openModal: (url: string) => void;
  closeModal: () => void;
}

const ShareModal = forwardRef<ShareModalRef>((props, ref) => {
  const [url, setUrl] = useState<string>();

  useImperativeHandle(ref, () => ({
    openModal: (url: string) => setUrl(url),
    closeModal: () => setUrl(""),
  }));

  return (
    <Modal open={!!url} onClose={() => setUrl("")}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          minWidth: 400,
          maxWidth: 700,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 2,
        }}
      >
        <ShareSocial
          url={url}
          socialTypes={["facebook", "twitter", "whatsapp"]}
          onSocialButtonClicked={(data) => console.log(data)}
        />
      </Box>
    </Modal>
  );
});

export default ShareModal;
