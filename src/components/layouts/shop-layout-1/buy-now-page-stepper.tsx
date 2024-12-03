"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
// LOCAL CUSTOM COMPONENT
import Stepper from "./stepper";

const STEPPER_LIST = [
  { title: "Items", disabled: false },
  { title: "Details", disabled: false },
  { title: "Payment", disabled: false },
  { title: "Review", disabled: true },
];

const BuyNowPageStepper = ({ children }: PropsWithChildren) => {
  const [selectedStep, setSelectedStep] = useState(0);

  const router = useRouter();
  const pathname = usePathname();

  const handleStepChange = (step: number) => {
    switch (step) {
      case 0:
        router.push("/buy-now/items");
        break;
      case 1:
        router.push("/buy-now/checkout");
        break;
      case 2:
        router.push("/buy-now/payment");
        break;
      case 3:
        router.push("/orders");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    switch (pathname) {
      case "/buy-now/items":
        setSelectedStep(1);
        break;
      case "/buy-now/checkout":
        setSelectedStep(2);
        break;
      case "/buy-now/payment":
        setSelectedStep(3);
        break;
      default:
        break;
    }
  }, [pathname]);

  return (
    <Container sx={{ my: 4 }}>
      <Box mb={3} display={{ sm: "block", xs: "none" }}>
        <Stepper
          stepperList={STEPPER_LIST}
          selectedStep={selectedStep}
          onChange={handleStepChange}
        />
      </Box>

      {children}
    </Container>
  );
};

export default BuyNowPageStepper;
