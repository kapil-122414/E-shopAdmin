import React, { useEffect, useState } from "react";
import { categorys, brand } from "../service/productapi";
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
  const [category, setCategory] = useState([]);
  const [brands, setBrand] = useState([]);
  const [fromdata, setfromdata] = useState({
    productname: "",
    slug: "",
    description: "",
    shortDescription: "",
    price: "",
    mrp: "",
    discount: "",
    stock: "",

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
        sku: "",
      },
    ]);
  };
  const resetForm = () => {
    setfromdata({
      productname: "",
      slug: "",
      description: "",
      shortDescription: "",
      price: "",
      mrp: "",
      discount: "",
      stock: "",
      category: "",
      brand: "",
      status: "",
    });

    setVariants([
      {
        size: "",
        color: "",
        price: "",
        stock: "",
        sku: "",
      },
    ]);

    setImage(null);
  };
  const generateSku = (productName, color, size) => {
    if (!productName || !color || !size) return "";

    return `${productName.slice(0, 3).toUpperCase()}-${color
      .slice(0, 3)
      .toUpperCase()}-${size.toUpperCase()}`;
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...variants];

    updatedVariants[index][field] = value;

    const productName = fromdata.productname || "";
    const color = updatedVariants[index].color || "";
    const size = updatedVariants[index].size || "";

    updatedVariants[index].sku = generateSku(productName, color, size);

    setVariants(updatedVariants);
  };
  const removeVariant = (indexToRemove) => {
    setVariants((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const categoryies = async () => {
    try {
      const res = await categorys();
      console.log("hyy");
      console.log("API Response:", res.data);

      setCategories(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const branddata = async () => {
    const res = await brand();
    setBrand(res.data.data);
  };
  useEffect(() => {
    categoryies();
    branddata();
  }, []);
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
    resetForm,
    category,
    brands,
  };
};

export default producthooks;
