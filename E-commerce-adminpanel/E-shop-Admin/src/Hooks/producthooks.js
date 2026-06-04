import React, { useEffect, useState } from "react";
import {
  categorys,
  brand,
  createDescription,
  postproduct,
} from "../service/productapi";
const producthooks = () => {
  const [image, setImage] = useState(null);
  const [from, setfrom] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [variants, setVariants] = useState([
    {
      size: "",
      color: "",
      price: "",
      stock: "",
    },
  ]);
  const [loading, setloading] = useState(false);
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
      setCategory(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const branddata = async () => {
    try {
      const res = await brand();
      setBrand(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const setDescription = async () => {
    if (!fromdata.productname || !fromdata.category || !fromdata.brand) {
      alert("Product Name, Category aur Brand fill karo");
      return;
    }
    try {
      setloading(true);
      const data = {
        Productname: fromdata.productname,
        color: variants[0]?.color,
        brand: fromdata.brand,
        price: fromdata.price,
        category: fromdata.category,
      };

      const res = await createDescription(data);
      setfromdata((prev) => ({
        ...prev,
        description: res.data.description,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  const createproduct = async () => {
    try {
      console.log("hello");
      const data = new FormData();
      data.append("productname", fromdata.productname);
      data.append("slug", fromdata.slug);
      data.append("description", fromdata.description);
      data.append("shortDescription", fromdata.shortDescription);
      data.append("price", fromdata.price);
      data.append("mrp", fromdata.mrp);
      data.append("discount", fromdata.discount);
      data.append("stock", fromdata.stock);
      data.append("status", fromdata.status);
      data.append("image", imageFile);
      data.append("category", fromdata.category);
      data.append("brand", fromdata.brand);
      data.append("variants", JSON.stringify(variants));

      const res = await postproduct(data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
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
    setDescription,
    loading,
    createproduct,
    imageFile,
    setImageFile,
  };
};

export default producthooks;
