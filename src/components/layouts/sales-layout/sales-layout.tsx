"use client";

import { FC, Fragment, ReactNode } from "react";
import Divider from "@mui/material/Divider";
// CUSTOM GLOBAL COMPONENTS
import { Topbar } from "components/topbar";
import { Header } from "components/header";
import { Footer1 } from "components/footer";
import { SearchInputWithCategory } from "components/search-box";
import { MobileNavigationBar } from "components/mobile-navigation";
import useHeader from "components/header/use-header";

/** USED: SALES-1 & SALES-2 PAGES */

// =============================================================

type NoOne = {
  type?: "one";
  categoryNav?: never;
  children: ReactNode;
};

type NoTwo = {
  type?: "two";
  children: ReactNode;
  categoryNav: ReactNode;
};

type SaleLayoutProps = NoOne | NoTwo;
// =============================================================

const SalesLayout: FC<SaleLayoutProps> = (props) => {
  const { children, type = "one", categoryNav } = props;
  const {
    dialogOpen,
    sidenavOpen,
    searchBarOpen,
    toggleDialog,
    toggleSearchBar,
    toggleSidenav,
  } = useHeader();
  let CONTENT = null;

  // FOR SALES 1 PAGE
  if (type == "one") {
    CONTENT = <Fragment>{children}</Fragment>;
  }

  // FOR SALES 2 PAGE
  if (type == "two") {
    CONTENT = (
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
      <Header
        searchInput={
          <SearchInputWithCategory
            searchBarOpen={false}
            toggleSearchBar={toggleSearchBar}
          />
        }
        sidenavOpen={sidenavOpen}
        dialogOpen={dialogOpen}
        searchBarOpen={searchBarOpen}
        toggleSidenav={toggleSidenav}
        toggleDialog={toggleDialog}
        toggleSearchBar={toggleSearchBar}
      />

      {/* RENDER MAIN CONTENT AREA */}
      {CONTENT}

      {/* FOOTER AREA */}
      <Footer1 />

      {/* SMALLER DEVICE NAVIGATION */}
      <MobileNavigationBar />
    </Fragment>
  );
};

export default SalesLayout;
