import React from "react";
import BrandTable from "../../components/ui/BrandTable";
import useBrands from "./useBrands";
import BrandForm from "../../components/ui/BrandForm";

const Brands = ({ search: globalSearch = "" }) => {
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
    page,
    setpage,
    totalpage,
    settotalpage,
    search,
    setSearch,
  } = useBrands(globalSearch);
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
          className="btn-add-product flex items-center gap-2 px-4 py-2 bg-[#e8521a] text-white rounded-lg hover:bg-[#dc4a1a] transition-colors"
          onClick={() => {
            setform(true);
          }}
        >
          +Add Brand
        </div>
      </div>

      <BrandTable
        getdata={getdata}
        setgetdata={setgetdata}
        brand_delete={brand_delete}
        loading={loading}
        editid={editid}
        page={page}
        totalpage={totalpage}
        setpage={setpage}
        settotalpage={settotalpage}
        search={search}
        setSearch={setSearch}
      />

      {form && (
        <BrandForm
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
