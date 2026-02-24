import { useEffect, useMemo, useState } from "react";
import { Product1, ProductVariant } from "models/Product.model";
import { calculateDiscountAmount, getProductFormattedPrice } from "lib";

export interface AttributeState {
  name: string;
  value: string;
}

export interface MappedAttribute {
  id: string;
  title: string;
  values: { value: string; disabled: boolean }[];
}

export interface Media {
  src: string;
  type: "video" | "image";
}

export function useProductIntro(product: Product1) {
  const {
    productType,
    variants,
    discountAmount,
    discountType,
    images,
    videos,
  } = product;

  const [selectedAttributes, setSelectedAttributes] = useState<
    AttributeState[]
  >([]);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>();
  const [mappedAttributes, setMappedAttributes] = useState<MappedAttribute[]>(
    []
  );
  const [price, setPrice] = useState<number | string>(
    getProductFormattedPrice(product).basePrice
  );
  const [quantity, setQuantity] = useState<number>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  // Typed media list
  const medias: Media[] = [
    ...videos.map((v) => ({ src: v, type: "video" as const })),
    ...images.map((i) => ({ src: i, type: "image" as const })),
  ];

  // Initialize mapped attributes and unambiguous auto-selection
  useEffect(() => {
    if (!variants?.length) return;

    // Map attributes across all variants
    const attributeMap: Record<string, Set<string>> = {};
    variants.forEach((variant) =>
      variant.attributes.forEach((attr) => {
        if (!attributeMap[attr.name]) attributeMap[attr.name] = new Set();
        attributeMap[attr.name].add(attr.value);
      })
    );

    const mapped = Object.entries(attributeMap).map(([name, values]) => ({
      id: variants.find((v) => v.attributes.some((a) => a.name === name))!.id,
      title: name,
      values: Array.from(values).map((v) => ({ value: v, disabled: false })),
    }));

    setMappedAttributes(mapped);

    // CASE 1: Only one variant → auto-select
    if (variants.length === 1) {
      const v = variants[0];
      setSelectedVariant(v);
      setPrice(v.price);
      setQuantity(v.units);
      setSelectedAttributes(v.attributes);
      return;
    }

    // CASE 2: Only one attribute with one value → auto-select
    if (mapped.length === 1 && mapped[0].values.length === 1) {
      const attr = mapped[0];
      const singleVariant = variants.find((v) =>
        v.attributes.some(
          (a) => a.name === attr.title && a.value === attr.values[0].value
        )
      );
      if (singleVariant) {
        setSelectedVariant(singleVariant);
        setPrice(singleVariant.price);
        setQuantity(singleVariant.units);
        setSelectedAttributes([
          { name: attr.title, value: attr.values[0].value },
        ]);
      }
      return;
    }
  }, [variants]);

  // Update variant when all attributes are selected
  useEffect(() => {
    if (!variants?.length) return;

    let match: ProductVariant | undefined;

    // only find when full combination selected
    if (selectedAttributes.length > 0) {
      match = variants.find(
        (variant) =>
          variant.attributes.length === selectedAttributes.length &&
          selectedAttributes.every((attr) =>
            variant.attributes.some(
              (a) => a.name === attr.name && a.value === attr.value
            )
          )
      );
    }

    if (match) {
      setSelectedVariant(match);
      setPrice(match.price);
      setQuantity(match.units);
      if (variants.length > 1) {
        const imgIndex = medias.findIndex((m) => m.src === match.image);
        if (imgIndex >= 0) setSelectedImage(imgIndex);
      }
    } else {
      setSelectedVariant(undefined);
      setPrice(getProductFormattedPrice(product).basePrice);
      setQuantity(undefined);
    }

    // Update available attributes dynamically
    const available = getNextAvailableAttributes(variants, selectedAttributes);
    setMappedAttributes((prev) =>
      prev.map((attr) => ({
        ...attr,
        values: attr.values.map((val) => ({
          ...val,
          disabled: !available[attr.title]?.includes(val.value),
        })),
      }))
    );
  }, [selectedAttributes, variants]);

  // Discounted price calculation
  const discountedPrice = useMemo(() => {
    if (!selectedVariant) return 0;
    if (!discountAmount) return selectedVariant.price;
    const discount = calculateDiscountAmount(
      discountType,
      selectedVariant.price,
      discountAmount
    );
    return selectedVariant.price - discount;
  }, [selectedVariant, discountAmount, discountType]);

  // Attribute selection handler
  const handleSelectAttribute = (name: string, value: string) => {
    setSelectedAttributes((prev) => {
      const index = prev.findIndex((a) => a.name === name);
      if (index !== -1) {
        if (prev[index].value === value)
          return prev.filter((_, i) => i !== index);
        return prev.map((a, i) => (i === index ? { name, value } : a));
      }
      return [...prev, { name, value }];
    });
  };

  // Compute next available attributes
  function getNextAvailableAttributes(
    variants: ProductVariant[],
    selected: AttributeState[]
  ): Record<string, string[]> {
    if (selected.length === 0)
      return variants.reduce(
        (acc, variant) => {
          variant.attributes.forEach((attr) => {
            if (!acc[attr.name]) acc[attr.name] = [];
            if (!acc[attr.name].includes(attr.value))
              acc[attr.name].push(attr.value);
          });
          return acc;
        },
        {} as Record<string, string[]>
      );

    // Keep all values active for a single selected attribute
    if (selected.length === 1) {
      const selectedAttr = selected[0];
      const filtered = variants.filter((variant) =>
        variant.attributes.some(
          (a) => a.name === selectedAttr.name && a.value === selectedAttr.value
        )
      );

      const map: Record<string, string[]> = {};
      filtered.forEach((variant) => {
        variant.attributes.forEach((attr) => {
          if (!map[attr.name]) map[attr.name] = [];
          if (!map[attr.name].includes(attr.value))
            map[attr.name].push(attr.value);
        });
      });

      // All values of that single attribute remain enabled
      const allValuesForSelected = Array.from(
        new Set(
          variants.flatMap((v) =>
            v.attributes
              .filter((a) => a.name === selectedAttr.name)
              .map((a) => a.value)
          )
        )
      );

      map[selectedAttr.name] = allValuesForSelected;
      return map;
    }

    // For multiple attributes, strictly limit to valid combos
    const filtered = variants.filter((variant) =>
      selected.every((attr) =>
        variant.attributes.some(
          (a) => a.name === attr.name && a.value === attr.value
        )
      )
    );

    return filtered.reduce(
      (acc, variant) => {
        variant.attributes.forEach((attr) => {
          if (!acc[attr.name]) acc[attr.name] = [];
          if (!acc[attr.name].includes(attr.value))
            acc[attr.name].push(attr.value);
        });
        return acc;
      },
      {} as Record<string, string[]>
    );
  }

  return {
    medias,
    mappedAttributes,
    selectedAttributes,
    selectedVariant,
    selectedImage,
    selectedQuantity,
    price,
    quantity,
    discountedPrice,
    handleSelectAttribute,
    setSelectedQuantity,
    setSelectedImage,
  };
}
