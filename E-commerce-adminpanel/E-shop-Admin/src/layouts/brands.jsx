import React from "react";
import Brandtable from "../cards/brandtable";
import Brandhooks from "../Hooks/brandhooks";
import Brandfrom from "../froms/brandfrom";

const Brands = () => {
  const {
    form,
    setform,
    resetfrom,
    fromdata,
    setfromdata,
    image,
    setimage,
    brandcreate,
    getdata,
    setgetdata,
    brand_delete,
    loading,
    setloading,
    editid,
    preview,
    setPreview,
    update_brand,
    getedit,
  } = Brandhooks();
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

      <Brandtable
        getdata={getdata}
        setgetdata={setgetdata}
        brand_delete={brand_delete}
        loading={loading}
        editid={editid}
      />

      {form && (
        <Brandfrom
          setform={setform}
          fromdata={fromdata}
          setfromdata={setfromdata}
          image={image}
          setimage={setimage}
          brandcreate={brandcreate}
          resetfrom={resetfrom}
          preview={preview}
          setPreview={setPreview}
          update_brand={update_brand}
          editid={editid}
          getedit={getedit}
        />
      )}
    </>
  );
};

export default Brands;
