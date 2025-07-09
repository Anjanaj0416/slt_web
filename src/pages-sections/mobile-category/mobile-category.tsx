"use client";

import {
  Box,
  Breadcrumbs,
  Card,
  CardActionArea,
  CardContent,
  Collapse,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Category1 from "models/Category.model";
import Link from "next/link";

type Props = {
  categories: Category1[];
};

const MobileCategoryPageView = ({ categories }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<Category1>(null);
  const [expandedSub, setExpandedSub] = useState<string | null>(null);

  const handleMainClick = (category: any) => {
    setSelectedCategory(category);
    setExpandedSub(null);
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setExpandedSub(null);
  };

  const handleSubClick = (name: string) => {
    setExpandedSub((prev) => (prev === name ? null : name));
  };
  console.log(selectedCategory);

  return (
    <Box p={2}>
      {!selectedCategory ? (
        // === Level 1: Main Category Tiles ===
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
          {categories.map((cat) => (
            <Card key={cat.name}>
              <CardActionArea onClick={() => handleMainClick(cat)}>
                <CardContent>
                  <Typography align="center">{cat.name}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      ) : (
        // === Level 2: Sub Category List ===
        <Box>
          <Breadcrumbs sx={{ mb: 2, ml:2 }}>
            <Typography
              onClick={handleBack}
              color="primary"
              sx={{ cursor: "pointer" }}
            >
              Categories
            </Typography>
            <Typography>{selectedCategory.name}</Typography>
          </Breadcrumbs>

          <List>
            {selectedCategory.subCategories.map((sub: any) => (
              <Box key={sub.name}>
                <ListItem
                  onClick={() => handleSubClick(sub.name)}
                  secondaryAction={
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSubClick(sub.name);
                      }}
                    >
                      {expandedSub === sub.name ? (
                        <ExpandLessIcon />
                      ) : (
                        <ExpandMoreIcon />
                      )}
                    </IconButton>
                  }
                >
                  <ListItemText primary={sub.name} />
                </ListItem>
                <Collapse
                  in={expandedSub === sub.name}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {sub.subCategories?.map((item: Category1) => (
                      <ListItem key={item.id} sx={{ pl: 4 }}>
                        <Link
                          href={`/products/search?categoryId=${item.id}_${item.name}`}
                        >
                          <ListItemText primary={item.name} />
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </Box>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default MobileCategoryPageView;
