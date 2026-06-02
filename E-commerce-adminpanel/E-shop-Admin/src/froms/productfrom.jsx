import React from "react";
import { FaArrowLeft } from "react-icons/fa";
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
}) => {
  const onhandlesubmit = (e) => {
    e.preventDefault();
  };
  const handleImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };
  const onhandchange = (e) => {
    const { name, value } = e.target;
    setfromdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log(fromdata);
  return (
    <div className="product-from">
      <form className="product-fromdata" onSubmit={onhandlesubmit}>
        <FaArrowLeft
          onClick={() => {
            setfrom(false);
          }}
        />
        <h2>Add New Product</h2>
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
                name="productName"
                onchange={onhandchange}
                value={fromdata.productname}
                placeholder="Enter product Name"
              />
              <label>Slug</label>
              <input type="text" placeholder="Enter product Name" />
              <label>Description</label>
              <textarea
                name="description"
                placeholder="Enter product description"
                className="border border-gray-300 rounded-lg p-10 outline-none resize-none"
                rows="4"
              />
              <label>Short Description</label>
              <input type="text" placeholder="Enter product Name" />
            </div>
            <div>
              <h5>Pricing & Inventory</h5>
              <div className="flex justify-between gap-7">
                <div>
                  <label>Price</label>
                  <input type="number" min="0" placeholder="0.00" />
                  <label>Discount (%)</label>
                  <input type="number" min="0" placeholder="0" />
                </div>
                <div>
                  <label>MRP</label>
                  <input type="number" min="0" placeholder="0.00" />

                  <label>Stock Quantity</label>
                  <input type="number" min="0" placeholder="0.00" />
                </div>
              </div>
              <label>SKU</label>
              <input type="text" placeholder="PROD-001" />
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
              <select>
                <option> select Category</option>
              </select>
              <label>Brand</label>
              <select>
                <option> Select Brand</option>
              </select>
              <label>Status</label>
              <select>
                <option>status</option>
                <option value="active">Active</option>
                <option value="inactive">InActive</option>
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
                  setfrom(false);
                }}
              >
                Cancel
              </button>
              <button className="bg-[#E8521A] text-[#ffffff]" type="submit">
                Create product
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default productfrom;
