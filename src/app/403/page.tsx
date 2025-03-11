"use client";

import { Box, Button, Typography } from "@mui/material";
import { FlexRowCenter, FlexBox } from "components/flex-box";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";
import router from "next/router";
import { useEffect, useState } from "react";
export default function Page() {
  const [render, setRender] = useState(false);
  const { status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      notFound();
    } else if (status === "unauthenticated") {
      setRender(true);
    }
  }, [status]);
  return (
    render && (
      <FlexRowCenter px={2} minHeight="100vh" flexDirection="column">
        <Typography variant="h1" color="error" fontWeight="bold" mb={2}>
          403
        </Typography>
        <Typography variant="h5" mb={4}>
          Detected you signed in to another portal. Please sign out all before
          sign in!
        </Typography>
        <FlexBox flexWrap="wrap" gap={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/")}
          >
            Go to Home
          </Button>
        </FlexBox>
      </FlexRowCenter>
    )
  );
}
