import { Box } from "@mui/material";
import { FC, Ref } from "react";
import {
  FixedCropper,
  FixedCropperRef,
  ImageRestriction,
} from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

interface Props {
  cropWidth: number;
  cropHeight: number;
  image: string;
  cropperRef: Ref<FixedCropperRef>;
}

export const CustomCropper: FC<Props> = ({
  cropWidth,
  cropHeight,
  image,
  cropperRef,
}) => {
  return (
    <Box style={{ width: "620px", height: "350px", marginBottom: "32px" }}>
      <FixedCropper
        ref={cropperRef}
        src={image}
        imageRestriction={ImageRestriction.stencil}
        stencilSize={{
          width: cropWidth,
          height: cropHeight,
        }}
      />
    </Box>
  );
};
