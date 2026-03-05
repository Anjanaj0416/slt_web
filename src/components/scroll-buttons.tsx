"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const ScrollButtons = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToBottom = () =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

  if (!visible) return null;

  const buttonStyle = {
    width: 44,
    height: 44,
    backgroundColor: "#ffffff",
    color: "#111111",
    borderRadius: "50%",
    border: "2px solid #e0e0e0",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    "&:hover": {
      backgroundColor: "#f5f5f5",
      borderColor: "#bdbdbd",
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 32,
        right: 24,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      {/* SCROLL TO TOP */}
      <IconButton onClick={scrollToTop} sx={buttonStyle}>
        <KeyboardArrowUpIcon fontSize="medium" />
      </IconButton>

      {/* SCROLL TO BOTTOM */}
      <IconButton onClick={scrollToBottom} sx={buttonStyle}>
        <KeyboardArrowDownIcon fontSize="medium" />
      </IconButton>
    </Box>
  );
};

export default ScrollButtons;