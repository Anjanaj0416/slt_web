"use client";

import ProductTabs from "../product-tabs";
import AvailableShops from "../available-shops";
import RelatedProducts from "../related-products";
// CUSTOM DATA MODEL
import ProductIntro1 from "../product-intro1";
import Store from "models/Store.model";
import { Product1 } from "models/Product.model";
import { useFilteredProductsQuery } from "services/product-api";
import { Box, CircularProgress, Link, useTheme } from "@mui/material";
import { Carousel } from "components/carousel";
import { COMMON_DOT_STYLES } from "components/carousel/styles";
import { ENVIRONMENT } from "config";
import { useGetAllBannersQuery } from "services/banner-api";
import CarouselCard5 from "components/carousel-cards/carousel-card-5";

function getResponsiveImageUrls(imageUrl = "") {
  // keep captured extension and replace with suffix
  const m = imageUrl.match(/(.*)\.(png|jpe?g|webp)$/i);
  if (!m) return { tabletImage: imageUrl, mobileImage: imageUrl };
  const [, base, ext] = m;
  return {
    tabletImage: `${base}_tablet.${ext}`,
    mobileImage: `${base}_mobile.${ext}`,
  };
}

function getRandomMaxThree(array) {
  return [...array]
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(3, array.length));
}

// ==============================================================
interface Props {
  product: Product1;
  stores: Store[];
  ownerStore: Store;
  frequentlyBought?: Product1[];
}
// ==============================================================

const ProductDetailsPageView = ({ product, stores, ownerStore }: Props) => {
  const { data: products, isLoading: isLoadingRelated } =
    useFilteredProductsQuery({ categoryId: product.category.id, size: 5 });
  const relatedProducts = (products?.data ?? [])
    .filter((p: Product1) => p.id !== product.id)
    .slice(0, 4);
  const { palette } = useTheme();
  const { data: banners, isLoading } = useGetAllBannersQuery({
    type: "PRODUCT_SECTION_CAROUSEL",
  });
  return (
    <Box sx={{ my: 4, px: { xs: 2, md: 16 } }}>
      {/* PRODUCT DETAILS INFO AREA */}
      <ProductIntro1 product={product} store={ownerStore} />

      {!isLoading && banners?.data?.length && (
        <Box width={"100%"} mt={{ xs: 4, lg: 0 }}>
          <Carousel
            dots
            arrows={false}
            spaceBetween={0}
            slidesToShow={1}
            autoplay
            dotColor={palette.dark?.main}
            dotStyles={COMMON_DOT_STYLES}
          >
            {getRandomMaxThree(banners.data)?.map((item) => {
              const url = `${ENVIRONMENT.S3_BUCKET_URL}/${item.imageUrl}`;
              const { tabletImage, mobileImage } = getResponsiveImageUrls(url);

              return (
                <Link key={item.id} href={item.link} target="_blank">
                  <CarouselCard5
                    mode="light"
                    bgImage={url}
                    bgImageTablet={tabletImage}
                    bgImageMobile={mobileImage}
                  />
                </Link>
              );
            })}
          </Carousel>
        </Box>
      )}

      {/* PRODUCT DESCRIPTION AND REVIEW */}
      <ProductTabs
        description={product.description}
        specification={product.specification}
        productId={product.id}
      />

      {/* FREQUENTLY BOUGHT PRODUCTS AREA */}
      {/* <FrequentlyBought products={props.frequentlyBought} /> */}

      {/* AVAILABLE SHOPS AREA */}
      {stores.length > 0 && <AvailableShops stores={stores} />}

      {/* RELATED PRODUCTS AREA */}
      {isLoadingRelated ? (
        <CircularProgress />
      ) : (
        relatedProducts?.length > 0 && (
          <RelatedProducts products={relatedProducts} />
        )
      )}
    </Box>
  );
};

export default ProductDetailsPageView;
