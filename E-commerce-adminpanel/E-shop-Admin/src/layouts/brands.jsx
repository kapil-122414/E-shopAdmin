import React from "react";
import Brandtable from "../cards/brandtable";
import Brandhooks from "../Hooks/brandhooks";
import Brandfrom from "../froms/brandfrom";
const Brands = () => {
  const { form, setform, fromdata, setfromdata, image, setimage } =
    Brandhooks();
  return (
    <>
      <div class="p-2 flex justify-between categoy-head">
        <div>
          <h1>Brand Management</h1>
          <p class="text-[#717182] text-sm ">
            Manage product brands and manufacturers
          </p>
        </div>
        <div
          className="px-6 py-3 cursor-pointer"
          onClick={() => {
            setform(true);
          }}
        >
          +Add Brand
        </div>
      </div>
      <Brandtable />
      {form && (
        <Brandfrom
          setform={setform}
          fromdata={fromdata}
          setfromdata={setfromdata}
          image={image}
          setimage={setimage}
        />
      )}
    </>
  );
};

export default Brands;
