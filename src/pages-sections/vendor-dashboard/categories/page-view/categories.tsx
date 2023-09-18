"use client";

import { Box, Card, Stack, Table, TableContainer, TableBody } from "@mui/material";
// GLOBAL CUSTOM COMPONENTS
import { H3 } from "components/Typography";
import Scrollbar from "components/Scrollbar";
import { TableHeader, TablePagination } from "components/data-table";
// GLOBAL CUSTOM HOOK
import useMuiTable from "hooks/useMuiTable";
// Local CUSTOM COMPONENT
import CategoryRow from "../category-row";
import SearchArea from "../../search-box";
// CUSTOM DATA MODEL
import Category from "models/Category.model";
// TABLE HEAD COLUMN DATA
import { tableHeading } from "../table-heading";

// =============================================================================
type Props = { categories: Category[] };
// =============================================================================

const CategoriesPageView = ({ categories }: Props) => {
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
        url="/admin/categories/create"
        searchPlaceholder="Search Category..."
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
                  <CategoryRow key={category.id} category={category} selected={selected} />
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
