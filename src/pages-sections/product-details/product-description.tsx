"use client";

import { H3 } from "components/Typography";
type Props = {
  description: string;
};
const ProductDescription = ({ description }: Props) => {
  return (
    <div>
      <H3 mb={2}>Description:</H3>
      <div dangerouslySetInnerHTML={{ __html: description }}></div>
    </div>
  );
};

export default ProductDescription;
