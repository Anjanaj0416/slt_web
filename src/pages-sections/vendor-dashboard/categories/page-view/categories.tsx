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
import CategoryRow from "../category-row";
// CUSTOM DATA MODEL
import Category from "models/Category.model";

// TABLE HEADING DATA LIST
const tableHeading = [
  { id: "id", label: "ID", align: "left" },
  { id: "name", label: "Name", align: "left" },
  { id: "image", label: "Image", align: "left" },
  { id: "level", label: "Level", align: "left" },
  { id: "featured", label: "Featured", align: "left" },
  { id: "action", label: "Action", align: "center" },
];

// =============================================================================
type Props = { categories: Category[] };
// =============================================================================

const CategoriesPageView = (props: Props) => {
  const { categories } = props;

  // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID
  const filteredCategories = categories.map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    image: item.image,
    featured: item.featured,
    level: Math.ceil(Math.random() * 1),
  }));

  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({ listData: filteredCategories });

  return (
    <Box py={4}>
      <H3 mb={2}>Product Categories</H3>

      <SearchArea
        handleSearch={() => {}}
        buttonText="Add Category"
        searchPlaceholder="Search Category..."
        handleBtnClick={() => {
          //   Router.push("/admin/categories/create");
        }}
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
                rowCount={categories.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {filteredList.map((category) => (
                  <CategoryRow item={category} key={category.id} selected={selected} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(categories.length / rowsPerPage)}
          />
        </Stack>
      </Card>
    </Box>
  );
};

export default CategoriesPageView;
