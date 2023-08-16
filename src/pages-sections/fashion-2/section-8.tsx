"use client";

import { FC } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import { H2 } from "components/Typography";
import { BlogCard2 } from "components/blog-cards";
// CUSTOM DATA MODEL
import Blog from "models/Blog.model";

// =======================================
type Section8Props = { blogs: Blog[] };
// =======================================

const Section8: FC<Section8Props> = ({ blogs }) => {
  return (
    <Container sx={{ mt: 8 }}>
      <H2 textAlign="center" mb={4}>
        Latest Articles
      </H2>

      <Grid container spacing={3}>
        {blogs.map((item) => (
          <Grid item md={4} xs={12} key={item.id}>
            <BlogCard2
              title={item.title}
              date={item.createdAt}
              image={item.thumbnail}
              description={item.description}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Section8;
