import React, { useEffect, useState } from "react";
import {
  categorys,
  brand,
  createDescription,
  postproduct,
  productget,
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
      sku: "",
    },
  ]);
  const [loading, setloading] = useState(false);
  const [category, setCategory] = useState([]);
  const [brands, setBrand] = useState([]);
  const [productdata, setProductdata] = useState([]);
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
  const [totalpage, settotalpage] = useState(1);
  const [page, setpage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setstatus] = useState("");
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
      setloading(true);
      const data = new FormData();
      data.append("Productname", fromdata.productname);
      data.append("slug", fromdata.slug);
      data.append("Description", fromdata.description);
      data.append("shortdiscription", fromdata.shortDescription);
      data.append("price", fromdata.price);
      data.append("mrp", fromdata.mrp);
      data.append("discount", fromdata.discount);
      data.append("stock", fromdata.stock);
      data.append("status", fromdata.status);
      data.append("Img", imageFile);
      data.append("categoryId", fromdata.category);
      data.append("brand", fromdata.brand);
      data.append("variant", JSON.stringify(variants));

      const res = await postproduct(data);
      if (res.status === 201 || res.status === 200) {
        return true;
      }
      return false;
      consoe.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };
  const getproduct = async () => {
    console.log("hyy");
    try {
      setloading(true);
      const res = await productget(page, search, status);
      setProductdata(res.data.data);

      settotalpage(res.data.totalPages);
    } catch (error) {
      console.log("error", error.response?.data);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    categoryies();
    branddata();
    getproduct();
  }, [page, search, status]);
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
    productdata,
    setProductdata,
    getproduct,
    search,
    setSearch,
    status,
    setstatus,
    totalpage,
    settotalpage,
    page,
    setpage,
  };
};

export default producthooks;
