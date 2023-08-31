"use client";

import { FC, Fragment, ReactNode } from "react";
import Divider from "@mui/material/Divider";
// CUSTOM GLOBAL COMPONENTS
import Topbar from "components/Topbar";
import { Header } from "components/header";
import { Navbar } from "components/navbar";
import { Footer1 } from "components/footer";
import { MobileNavigationBar } from "components/mobile-navigation";
import { SearchInputWithCategory } from "components/search-box";

/** USED: SALES-1 & SALES-2 PAGES */

// =============================================================

type NoOne = { type?: "one"; categoryNav?: never; children: ReactNode };
type NoTwo = { type?: "two"; children: ReactNode; categoryNav: ReactNode };

type SaleLayoutProps = NoOne | NoTwo;
// =============================================================

const SalesLayout: FC<SaleLayoutProps> = (props) => {
  const { children, type = "one", categoryNav } = props;

  let content = null;

  // FOR SALES 1 PAGE
  if (type == "one") {
    content = (
      <Fragment>
        <Navbar />
        {children}
      </Fragment>
    );
  }

  // FOR SALES 2 PAGE
  if (type == "two") {
    content = (
      <Fragment>
        <Divider />
        {categoryNav}
        <div className="section-after-sticky">{children}</div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      {/* TOP BAR AREA */}
      <Topbar />

      {/* HEADER AREA */}
      <Header searchInput={<SearchInputWithCategory />} />

      {/* RENDER MAIN CONTENT AREA */}
      {content}

      {/* FOOTER AREA */}
      <Footer1 />

      {/* SMALLER DEVICE NAVIGATION */}
      <MobileNavigationBar />
    </Fragment>
  );
};

export default SalesLayout;
