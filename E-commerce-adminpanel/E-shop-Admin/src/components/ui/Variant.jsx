import React from "react";
import { FaTrash } from "react-icons/fa";

const Variant = ({ variant, index, removeVariant, handleVariantChange }) => {
  
  return (
    <div className="variant-box">
      <div className="flex justify-between items-center">
        <h6>Variant {index + 1}</h6>

        <FaTrash
          className="cursor-pointer text-red-500"
          onClick={() => removeVariant(index)}
        />
      </div>

      <input
        type="text"
        placeholder="Size (M, L, XL)"
        value={variant.size}
        onChange={(e) => handleVariantChange(index, "size", e.target.value)}
      />

      <input
        type="text"
        placeholder="Color"
        value={variant.color}
        onChange={(e) => handleVariantChange(index, "color", e.target.value)}
      />

      <input
        type="number"
        placeholder="Price"
        min="0"
        value={variant.price}
        onChange={(e) => handleVariantChange(index, "price", e.target.value)}
      />

      <input
        type="number"
        placeholder="Stock"
        min="0"
        value={variant.stock}
        onChange={(e) => handleVariantChange(index, "stock", e.target.value)}
      />
      <input type="text" placeholder="SKU" value={variant.sku || ""} readOnly />
    </div>
  );
};

export default Variant;
