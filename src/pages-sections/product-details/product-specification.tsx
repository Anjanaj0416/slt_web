"use client";

import { H3 } from "components/Typography";
type Props = {
  specification: string;
};
const ProductSpecification = ({ specification }: Props) => {
  return (
    <div>
      <H3 mb={2}>Specification:</H3>
      <div dangerouslySetInnerHTML={{ __html: specification }}></div>
    </div>
  );
};

export default ProductSpecification;
