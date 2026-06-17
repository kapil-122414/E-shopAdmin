import React from "react";
import Producttable from "../cards/producttable";
import Producthooks from "../Hooks/producthooks";
import Productfrom from "../froms/productfrom";

const Product = () => {
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
    setDescription,
    loading,
    createproduct,
    setImageFile,
    imageFile,
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
    prodelete,
    proedit,
    editId,
    setEditId,
    updateproduct,
    view,
    setview,
    productview,
    viewdata,
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
        <Producttable
          productdata={productdata}
          setProductdata={setProductdata}
          search={search}
          setSearch={setSearch}
          status={status}
          setstatus={setstatus}
          totalpage={totalpage}
          settotalpage={settotalpage}
          page={page}
          setpage={setpage}
          loading={loading}
          prodelete={prodelete}
          proedit={proedit}
          setfrom={setfrom}
          view={view}
          setview={setview}
          productview={productview}
          viewdata={viewdata}
        />
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
          setDescription={setDescription}
          loading={loading}
          createproduct={createproduct}
          setImageFile={setImageFile}
          imageFile={imageFile}
          getproduct={getproduct}
          editId={editId}
          setEditId={setEditId}
          updateproduct={updateproduct}
        />
      )}
    </div>
  );
};

export default Product;
