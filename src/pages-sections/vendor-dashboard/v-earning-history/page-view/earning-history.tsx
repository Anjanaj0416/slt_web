"use client";

import { Box, Card, Stack, Table, TableContainer, TableBody } from "@mui/material";
// GLOBAL CUSTOM COMPONENTS
import { H3 } from "components/Typography";
import Scrollbar from "components/Scrollbar";
import { TableHeader, TablePagination } from "components/data-table";
// GLOBAL CUSTOM HOOK
import useMuiTable from "hooks/useMuiTable";
// LOCAL CUSTOM COMPONENTS
import { tableHeading } from "../table-heading";
import VendorEarningRow from "../v-earning-row";
// CUSTOM DATA MODEL
import { EarningHistory } from "../type";

// =============================================================================
type Props = { earnings: EarningHistory[] };
// =============================================================================

const EarningHistoryPageView = ({ earnings }: Props) => {
  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({ listData: earnings, defaultSort: "no" });

  return (
    <Box py={4}>
      <H3 mb={2}>Earning History</H3>

      <Card>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 1100 }}>
            <Table>
              <TableHeader
                order={order}
                hideSelectBtn
                orderBy={orderBy}
                heading={tableHeading}
                rowCount={earnings.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {filteredList.map((item, index) => (
                  <VendorEarningRow row={item} key={index} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(earnings.length / rowsPerPage)}
          />
        </Stack>
      </Card>
    </Box>
  );
};

export default EarningHistoryPageView;
