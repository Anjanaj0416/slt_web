"use client";

import { Box, Card, Stack, Table, TableContainer, TableBody } from "@mui/material";
// GLOBAL CUSTOM COMPONENTS
import { H3 } from "components/Typography";
import Scrollbar from "components/Scrollbar";
import { TableHeader, TablePagination } from "components/data-table";
// GLOBAL CUSTOM HOOK
import useMuiTable from "hooks/useMuiTable";
// Local CUSTOM COMPONENT
import SearchArea from "../../search-box";
import CustomerRow from "../customer-row";
// TABLE HEAD COLUMN DATA
import { tableHeading } from "../table-heading";

// =============================================================================
type Props = { customers: any[] };
// =============================================================================

const CustomersPageView = ({ customers }: Props) => {
  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({ listData: customers });

  return (
    <Box py={4}>
      <H3 mb={2}>Customers</H3>

      <SearchArea
        handleSearch={() => {}}
        buttonText="Add Customer"
        handleBtnClick={() => {}}
        searchPlaceholder="Search Customer..."
      />

      <Card>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 900 }}>
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
                {filteredList.map((customer) => (
                  <CustomerRow customer={customer} key={customer.id} />
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

export default CustomersPageView;
