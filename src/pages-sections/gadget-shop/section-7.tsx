"use client";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import { BlogCard1 } from "components/blog-cards";
import CategorySectionHeader from "components/CategorySectionHeader";
// CUSTOM DATA MODEL
import Blog from "models/Blog.model";

// ================================================
type Props = { blogs: Blog[] };
// ================================================

const Section7 = ({ blogs }: Props) => {
  return (
    <Container sx={{ mb: 8 }}>
      <CategorySectionHeader title="Get Ideas from our Blog" />

      <Grid container spacing={3}>
        {blogs.map((blog, index) => (
          <Grid item md={6} xs={12} key={index}>
            <BlogCard1 blog={blog} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Section7;
