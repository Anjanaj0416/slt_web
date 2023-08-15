"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
// CUSTOM COMPONENTS
import Footer from "../Footer";
import Section1 from "../Section1";
import Section2 from "../Section2";
import Section3 from "../Section3";
import Section4 from "../Section4";
import Section6 from "../Section6";
import Section5 from "../Section5";
import Setting from "components/Setting";

const IndexPageView = () => {
  const [filterDemo, setFilterDemo] = useState("");

  const handleChangeFilter = (value: string) => setFilterDemo(value);

  return (
    <Box id="top" overflow="hidden" bgcolor="background.paper">
      <Section1 />
      <Section6 handleChangeFilter={handleChangeFilter} />
      <Section2 />
      <Section5 />
      <Section3 filterDemo={filterDemo} setFilterDemo={handleChangeFilter} />
      <Section4 />
      <Footer />
      <Setting />
    </Box>
  );
};

export default IndexPageView;
