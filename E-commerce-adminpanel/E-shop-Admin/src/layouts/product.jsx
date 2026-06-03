import React from "react";
import Producttable from "../cards/producttable";
import Producthooks from "../Hooks/producthooks";
import Productfrom from "../froms/productfrom";

const Product = ({ search }) => {
  const {
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
  } = Producthooks();

  return (
    <div>
      <div className="p-2 flex justify-between categoy-head">
        <div>
          <h3> Product Management</h3>
          <p className="text-[#717182] text-sm ">
            Manage your product inventory
          </p>
        </div>
        <div className="px-6 py-3" onClick={() => setfrom(true)}>
          + Add Product
        </div>
      </div>
      <div>
        <Producttable />
      </div>

      {from && (
        <Productfrom
          from={from}
          setfrom={setfrom}
          variants={variants}
          setVariants={setVariants}
          addVariant={addVariant}
          removeVariant={removeVariant}
          handleVariantChange={handleVariantChange}
          image={image}
          setImage={setImage}
          fromdata={fromdata}
          setfromdata={setfromdata}
          resetForm={resetForm}
          category={category}
          brands={brands}
        />
      )}
    </div>
  );
};

export default Product;
