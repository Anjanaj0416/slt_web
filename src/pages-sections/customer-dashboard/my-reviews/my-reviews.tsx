"use client";

import { Fragment } from "react";
// Local CUSTOM COMPONENT
import DashboardHeader from "../dashboard-header";
import { Review1 } from "models/Review.model";
import { Card, Stack, Table, TableBody, TableContainer } from "@mui/material";
import Scrollbar from "components/Scrollbar";
import { TableHeader, TablePagination } from "components/data-table";
import useMuiTable from "hooks/useMuiTable";
import { useRouter } from "next/navigation";
import { tableHeading } from "./table-heading";
import ReviewRow from "./review-row";
import RateReviewIcon from "@mui/icons-material/RateReview";

// ==================================================================
type Props = { reviews: Review1[]; total: number };
// ==================================================================

const MyReviewsPageView = ({ reviews, total }: Props) => {
  const router = useRouter();

  const { order, orderBy, selected, filteredList, handleRequestSort } =
    useMuiTable({ listData: reviews });

  // HANDLE CHANGE PAGINATION
  const handleChangePage = (_: unknown, newPage: number) => {
    router.push(`?page=${newPage}`);
  };

  return (
    <Fragment>
      {/* TOP HEADER AREA */}
      <DashboardHeader title="My Reviews" Icon={RateReviewIcon} />

      {/* PRODUCT LIST AREA */}
      <Card>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 1000 }}>
            <Table>
              <TableHeader
                order={order}
                hideSelectBtn
                orderBy={orderBy}
                heading={tableHeading}
                rowCount={reviews.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {filteredList.map((review, index) => (
                  <ReviewRow review={review} key={index} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        {total ? (
          <Stack alignItems="center" my={4}>
            <TablePagination onChange={handleChangePage} count={total} />
          </Stack>
        ) : null}
      </Card>
    </Fragment>
  );
};

export default MyReviewsPageView;
