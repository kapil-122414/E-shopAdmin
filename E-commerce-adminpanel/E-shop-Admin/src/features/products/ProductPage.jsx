import React from "react";
import ProductTable from "../../components/ui/ProductTable";
import useProducts from "./useProducts";
import ProductForm from "../../components/ui/ProductForm";
import { FaPlus } from "react-icons/fa";

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
  } = useProducts();

  return (
    <div className="product-page">
      <div className="categoy-head">
        <div>
          <h3>Product Management</h3>
          <p className="text-[#717182] text-sm">
            Manage your product inventory
          </p>
        </div>
        <button
          onClick={() => setfrom(true)}
          className="btn-add-product flex items-center gap-2 px-4 py-2 bg-[#e8521a] text-white rounded-lg hover:bg-[#dc4a1a] transition-colors"
        >
          <FaPlus size={18} />
          <span>Add Product</span>
        </button>
      </div>
      <div className="product-table-wrapper">
        <div className="product-table">
          <ProductTable
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
      </div>

      {from && (
        <ProductForm
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
