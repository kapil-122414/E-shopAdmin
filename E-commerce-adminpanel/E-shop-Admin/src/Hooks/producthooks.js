import React, { useState } from "react";

const producthooks = () => {
  const [from, setfrom] = useState(false);
  const [image, setImage] = useState(null);
  const [variants, setVariants] = useState([
    {
      size: "",
      color: "",
      price: "",
      stock: "",
    },
  ]);
  const [fromdata, setfromdata] = useState({
    productName: "",
    slug: "",
    description: "",
    shortDescription: "",
    price: "",
    mrp: "",
    discount: "",
    stock: "",
    sku: "",
    category: "",
    brand: "",
    status: "",
  });
  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      {
        size: "",
        color: "",
        price: "",
        stock: "",
      },
    ]);
  };
  const removeVariant = (indexToRemove) => {
    setVariants((prev) => prev.filter((_, index) => index !== indexToRemove));
  };
  const handleVariantChange = (index, field, value) => {
    setVariants((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };
  return {
    from,
    setfrom,
    variants,
    setVariants,
    addVariant,
    removeVariant,
    handleVariantChange,
    image,
    setImage,
    fromdata,
    setfromdata,
  };
};

export default producthooks;
