import Link from "next/link";
import { FC, Fragment, useCallback, useState } from "react";
import IconButton from "@mui/material/IconButton";
import { Favorite, RemoveRedEye, FavoriteBorder } from "@mui/icons-material";
// STYLED COMPONENTS
import { HoverIconWrapper } from "./styles";

// ==============================================================
interface Props {
  isFavorite: boolean;
  toggleView: () => void;
  toggleFavorite: () => void;
}
// ==============================================================

const HoverActions: FC<Props> = ({ isFavorite, toggleFavorite, toggleView }) => {
  return (
    <HoverIconWrapper className="hover-box">
      <IconButton onClick={toggleView}>
        <RemoveRedEye color="disabled" fontSize="small" />
      </IconButton>

      <IconButton onClick={toggleFavorite}>
        {isFavorite ? (
          <Favorite color="primary" fontSize="small" />
        ) : (
          <FavoriteBorder fontSize="small" color="disabled" />
        )}
      </IconButton>
    </HoverIconWrapper>
  );
};

export default HoverActions;
