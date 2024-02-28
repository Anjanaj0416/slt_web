/* eslint-disable jsx-a11y/img-redundant-alt */
import { FC, useRef, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { CustomCropper } from "./cropper";
import { FixedCropperRef } from "react-advanced-cropper";
import { FlexBox } from "./flex-box";
import { H3 } from "./Typography";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  cropWidth: number;
  cropHeight: number;
  images: string[];
  open: boolean;
  setOpen: (value: boolean) => void;
  onSubmit: (croppedImages: File[]) => void;
}

const CropDialog: FC<Props> = ({
  cropWidth,
  cropHeight,
  images,
  open,
  setOpen,
  onSubmit,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [croppedImages, setCroppedImages] = useState<File[]>(
    new Array(images.length).fill(null)
  );
  const cropperRef = useRef<FixedCropperRef>(null);

  const handleUpload = () => {
    if (images.length === 1) {
      onCrop();
    }
    setOpen(false);
    onSubmit(croppedImages);
    setSelectedIndex(0);
    setCroppedImages([]);
  };

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
  };

  const base64ToFile = (dataURL: any) => {
    const splitArray = dataURL.split(",");
    const mime: string = splitArray[0].match(/:(.*?);/)[1];
    const decodeBase64 = atob(splitArray[1]);
    let n = decodeBase64.length;
    const u8array = new Uint8Array(n);
    while (n--) {
      u8array[n] = decodeBase64.charCodeAt(n);
    }
    // Create a Blob from the DataView
    const blob = new Blob([u8array]);

    // Create a dummy anchor element
    const a = document.createElement("a");

    // Set the href attribute to the Blob URL
    a.href = URL.createObjectURL(blob);

    // Access the pathname property to get the file name
    const fileName = a.pathname.split("/").pop();
    return new File([u8array], `${fileName}.${mime.split("/")[1]}`, {
      type: mime,
    });
  };

  const onCrop = () => {
    const cropper = cropperRef.current;
    if (cropper) {
      const base64Url = cropper.getCanvas()?.toDataURL();
      const file = base64ToFile(base64Url);
      //
      const cropperImagesCopy = croppedImages;
      cropperImagesCopy[selectedIndex] = file;
      //
      setCroppedImages((state) => [...cropperImagesCopy]);
      if (selectedIndex < images?.length - 1)
        setSelectedIndex(selectedIndex + 1);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedIndex((state) => 0);
    setCroppedImages((state) => []);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <DialogTitle>
        <FlexBox alignItems={"center"} justifyContent={"space-between"}>
          <H3>Upload Images</H3>
          <IconButton
            size="small"
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{ border: "1px solid black" }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </FlexBox>
      </DialogTitle>
      <DialogContent style={{ margin: "0 auto", textAlign: "center" }}>
        <CustomCropper
          cropperRef={cropperRef}
          cropWidth={cropWidth}
          cropHeight={cropHeight}
          image={images[selectedIndex]}
        />
        <ImageList
          sx={{ overflowX: "auto", whiteSpace: "wrap", display: "flex" }}
          cols={3}
        >
          {images?.map((image: string | undefined, index: number) => (
            <ImageListItem key={index}>
              <Box
                width={80}
                height={80}
                onClick={() => handleImageClick(index)}
                style={{
                  border: selectedIndex === index ? "3px solid #555" : "0",
                  background: `url("${image}")`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  borderRadius: "8px",
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </DialogContent>
      <DialogActions>
        {images?.length > 1 && <Button onClick={onCrop}>Crop</Button>}
        <Button
          variant="outlined"
          disabled={
            images.length > 1 &&
            (croppedImages.length < images.length ||
              croppedImages.includes(undefined))
          }
          onClick={handleUpload}
        >
          Insert
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CropDialog;
