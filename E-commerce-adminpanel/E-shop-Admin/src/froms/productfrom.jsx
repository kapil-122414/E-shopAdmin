import React from "react";
import { FaArrowLeft, FaMagic } from "react-icons/fa";

import Variant from "./variant";
const productfrom = ({
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
  setImageFile,
  imageFile,
  getproduct,
  setEditId,
  editId,
  updateproduct,
}) => {
  const onhandlesubmit = async (e) => {
    e.preventDefault();

    let success;

    if (editId) {
      success = await updateproduct(editId);
    } else {
      success = await createproduct();
    }

    if (success) {
      resetForm();
      setEditId(null);
      setfrom(false);
      getproduct();
    }
  };
  const slug = (text = "") => {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  };

  const handleImg = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };
  const onhandchange = (e) => {
    const { name, value } = e.target;

    setfromdata((prev) => {
      if (name === "discount" && Number(value) > 100) {
        return prev;
      }
      const updatedData = {
        ...prev,
        [name]: value,
      };

      if (name === "productname") {
        updatedData.slug = slug(value);
      }

      const mrp = name === "mrp" ? Number(value) : Number(prev.mrp || 0);

      const discount =
        name === "discount" ? Number(value) : Number(prev.discount || 0);

      updatedData.price = mrp - (mrp * discount) / 100;

      return updatedData;
    });
  };

  const totalStock = variants.reduce((sum, item) => {
    return sum + Number(item.stock || 0);
  }, 0);

  return (
    <div className="product-from">
      <form className="product-fromdata" onSubmit={onhandlesubmit}>
        <FaArrowLeft
          onClick={() => {
            setfrom(false);
            setEditId(null);
            resetForm();
          }}
        />
        <h2
          onClick={() => {
            resetForm();
            setEditId(null);
            setfrom(true);
          }}
        >
          Add New Product
        </h2>
        <p className="text-[#717182] text-sm">
          Fill in the details to create a new product
        </p>
        <div className="flex flex-wrap gap-20 complete-from ">
          <div className="from-left  ">
            <div>
              <h5>Basic Information</h5>
              <label>Product Name</label>
              <input
                type="text"
                name="productname"
                onChange={onhandchange}
                value={fromdata.productname}
                placeholder="Enter product Name"
              />
              <label>Slug</label>
              <input
                type="text"
                placeholder="Enter product Name"
                name="slug"
                value={fromdata.slug}
                readOnly
              />
              <div className="flex justify-between ai">
                <label>Description</label>
                <button
                  type="button"
                  onClick={setDescription}
                  className="flex items-center gap-2 px-4 py-2 bg-[#e8521a] text-white rounded-lg"
                >
                  <FaMagic size={18} />
                  {loading ? "Generating..." : "AI Generate"}
                </button>
              </div>
              <textarea
                name="description"
                value={fromdata.description}
                onChange={onhandchange}
                placeholder="Enter product description"
                className="border border-gray-300 rounded-lg p-10 outline-none resize-none"
                rows="4"
              />
              <label>Short Description</label>
              <input
                type="text"
                placeholder="Short Description"
                name="shortDescription"
                value={fromdata.shortDescription}
                onChange={onhandchange}
              />
            </div>
            <div>
              <h5>Pricing & Inventory</h5>
              <div className="flex justify-between gap-7">
                <div>
                  <label>Price</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0.00"
                    name="price"
                    value={fromdata.price}
                    readOnly
                  />
                  <label>Discount (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="0"
                    name="discount"
                    value={fromdata.discount}
                    onChange={onhandchange}
                  />
                </div>
                <div>
                  <label>MRP</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0.00"
                    name="mrp"
                    value={fromdata.mrp}
                    onChange={onhandchange}
                  />

                  <label>Stock Quantity</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0.00"
                    name="stock"
                    value={totalStock}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <div>
                  <h5>Product Variants</h5>
                </div>
                <div className="variant" onClick={addVariant}>
                  + Add Variant
                </div>
              </div>
              {variants.map((variant, index) => (
                <Variant
                  key={index}
                  variant={variant}
                  index={index}
                  removeVariant={removeVariant}
                  handleVariantChange={handleVariantChange}
                />
              ))}
            </div>
          </div>
          <div className="from-right">
            <div>
              <h1> Organization</h1>
              <label>Category</label>
              <select
                name="category"
                value={fromdata.category}
                onChange={onhandchange}
              >
                <option value="">Select Category</option>

                {category.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.Categoryname}
                  </option>
                ))}
              </select>
              <label>Brand</label>
              <select
                name="brand"
                value={fromdata.brand}
                onChange={onhandchange}
              >
                <option value="">Select Brand</option>

                {brands.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <label>Status</label>
              <select
                name="status"
                value={fromdata.status}
                onChange={onhandchange}
              >
                <option value="">status</option>
                <option value="active">Active</option>
                <option value="inactive">InActive</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of stock">Out of Stock</option>
              </select>
            </div>

            <div>
              <h5>Product Images</h5>

              <label>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImg}
                  accept="image/*"
                />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>

                <p>Click to upload or drag and drop</p>
                <span className="text-sm">PNG, JPG up to 5MB</span>
              </label>

              {/* Preview Boxes */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                {image ? (
                  <img
                    src={image}
                    alt="preview"
                    className="h-28 w-full object-cover rounded-lg"
                  />
                ) : (
                  <>
                    <div className="h-28 bg-gray-100 rounded-lg"></div>
                    <div className="h-28 bg-gray-100 rounded-lg"></div>
                  </>
                )}
              </div>
            </div>
            <div className="flex gap-4 justify-center text-center">
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setfrom(false);
                }}
              >
                Cancel
              </button>
              <button className="bg-[#E8521A] text-[#ffffff]" type="submit">
                {editId ? " edit product" : "save product"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default productfrom;
