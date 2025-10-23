import { Box } from "@mui/material";
import { FlexBox, FlexRowCenter } from "components/flex-box";
import LazyImage from "components/LazyImage";
import ENVIRONMENT from "config/environment";

export interface Media {
  src: string;
  type: "image" | "video";
}

interface Props {
  medias: Media[];
  selectedImage: number;
  onSelect: (index: number) => void;
  name: string;
}

const ProductGallery = ({ medias, selectedImage, onSelect, name }: Props) => (
  <Box>
    <FlexBox
      justifyContent="center"
      mb={2.5}
      width="100%"
      height={{ xs: 340, md: 600 }}
    >
      {medias.length < 1 ? (
        <LazyImage
          alt={name}
          width={280}
          height={280}
          src={`${ENVIRONMENT.APP_URL}/assets/images/default-product.jpg`}
          sx={{ objectFit: "contain" }}
        />
      ) : medias[selectedImage].type === "image" ? (
        <LazyImage
          alt={name}
          width={280}
          height={280}
          src={`${ENVIRONMENT.S3_BUCKET_URL}/${medias[selectedImage].src}`}
          sx={{ objectFit: "contain" }}
        />
      ) : (
        <video
          autoPlay
          muted
          controls
          width="100%"
          src={`${ENVIRONMENT.S3_BUCKET_URL}/${medias[selectedImage].src}`}
        />
      )}
    </FlexBox>

    <FlexBox overflow="auto" justifyContent="center" gap={1.2} minHeight={100}>
      {medias.map((media, i) => (
        <FlexRowCenter
          key={i}
          width={64}
          height={64}
          minWidth={64}
          border="2px solid"
          borderRadius="10px"
          onClick={() => onSelect(i)}
          sx={{
            cursor: "pointer",
            backgroundColor: "white",
            backgroundImage:
              media.type === "image"
                ? `url(${ENVIRONMENT.S3_BUCKET_URL}/${media.src})`
                : `url(/assets/images/video-placeholder.png)`, // use a placeholder for videos
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            transition: "all 0.25s ease-in-out",
            borderColor:
              selectedImage === i ? "primary.main" : "rgba(0,0,0,0.1)",
            boxShadow:
              selectedImage === i
                ? "0 0 0 2px rgba(25, 118, 210, 0.3)"
                : "none",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          {media.type === "video" && (
            <video
              src={`${ENVIRONMENT.S3_BUCKET_URL}/${media.src}`}
              muted
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          )}
        </FlexRowCenter>
      ))}
    </FlexBox>
  </Box>
);

export default ProductGallery;
