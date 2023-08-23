"use client";

import { Box, Card, Stack, Table, TableContainer, TableBody } from "@mui/material";
// GLOBAL CUSTOM COMPONENTS
import { H3 } from "components/Typography";
import Scrollbar from "components/Scrollbar";
import SearchArea from "components/dashboard/SearchArea";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
// GLOBAL CUSTOM HOOK
import useMuiTable from "hooks/useMuiTable";
// Local CUSTOM COMPONENT
import BrandRow from "../brand-row";
// CUSTOM DATA MODEL
import Brand from "models/Brand.model";

// TABLE HEADING DATA LIST
const tableHeading = [
  { id: "id", label: "ID", align: "center" },
  { id: "name", label: "Name", align: "center" },
  { id: "logo", label: "Logo", align: "center" },
  { id: "featured", label: "Featured", align: "center" },
  { id: "action", label: "Action", align: "center" },
];

// =============================================================================
type Props = { brands: Brand[] };
// =============================================================================

const BrandsPageView = ({ brands }: Props) => {
  // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID
  const filteredBrands = brands.map((item) => ({
    id: item.id,
    slug: item.slug,
    name: item.name,
    logo: item.image,
    featured: item.featured,
  }));

  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({ listData: filteredBrands, defaultSort: "name" });

  return (
    <Box py={4}>
      <H3 mb={2}>Product Brands</H3>

      <SearchArea
        handleSearch={() => {}}
        buttonText="Add Brand"
        searchPlaceholder="Search Brand..."
        handleBtnClick={() => {
          //   Router.push("/admin/brands/create");
        }}
      />

      <Card>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 600 }}>
            <Table>
              <TableHeader
                order={order}
                hideSelectBtn
                orderBy={orderBy}
                heading={tableHeading}
                numSelected={selected.length}
                rowCount={filteredList.length}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {filteredList.map((brand) => (
                  <BrandRow brand={brand} key={brand.id} selected={selected} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(filteredList.length / rowsPerPage)}
          />
        </Stack>
      </Card>
    </Box>
  );
};

export default BrandsPageView;
