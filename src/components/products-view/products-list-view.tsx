import { FC } from "react";
// CUSTOM DATA MODEL
import { Product1 } from "models/Product.model";
import ProductListCard from "components/product-cards/product-list-card/product-list-card";
import Loading from "app/loading";

// ==========================================================
type Props = { isLoading: boolean; products: Product1[] };
// ==========================================================

const ProductsListView: FC<Props> = ({ isLoading, products }) => {
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        products.map((item) => (
          <ProductListCard
            key={item.id}
            product={item}
            //rating={item.rating}
          />
        ))
      )}
    </div>
  );
};

export default ProductsListView;
