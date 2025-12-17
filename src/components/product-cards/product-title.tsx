import { FC } from "react";
import Link from "next/link";
import { H3 } from "components/Typography";

// ==============================================================
type Props = { title: string; id: string };
// ==============================================================

const ProductTitle: FC<Props> = ({ title, id }) => (
  <Link href={`/products/${id}_${encodeURIComponent(title)}`}>
    <H3
      mb={1}
      ellipsis
      title={title}
      fontSize={14}
      fontWeight={600}
      textTransform="capitalize"
      className="title"
      color="text.secondary"
    >
      {title}
    </H3>
  </Link>
);

export default ProductTitle;
