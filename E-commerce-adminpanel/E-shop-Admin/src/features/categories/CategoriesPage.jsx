import React from "react";
import CategoryForm from "../../components/ui/CategoryForm";
import useCategories from "./useCategories";
import Pagination from "../../components/common/Pagination";
import CategoryCard from "../../components/ui/CategoryCard";
import { FaSpinner, FaPlus, FaSearch } from "react-icons/fa";
const Categories = () => {
  const {
    from,
    setFrom,
    formdata,
    setFormdata,
    getdata,
    categoryies,
    postdata,
    deletedata,
    updatedata,
    editdata,
    seteditdata,
    loading,
    page,
    setpage,
    totalpage,
    search,
    setSearch,
    status,
    setstatus,
  } = useCategories();

  return (
    <div className="categories">
      <div className="categoy-head">
        <div>
          <h1>Category Management</h1>
          <h3 className="text-[#717182] text-sm ">
            Organize your products into categories
          </h3>
        </div>
        <button
          onClick={() => {
            setFrom(true);
            seteditdata(null);
            setFormdata({
              cartegoryname: "",
              slug: "",
              status: "",
              Img: null,
            });
          }}
          className="btn-add-category flex items-center gap-2 px-4 py-2 bg-[#e8521a] text-white rounded-lg hover:bg-[#dc4a1a] transition-colors"
        >
          <FaPlus size={18} />
          <span>Add Category</span>
        </button>
      </div>

      <div className="category-search">
        <div className="category-search-input-wrapper">
          <FaSearch className="category-search-icon" />
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => {
              setpage(1);
              setSearch(e.target.value);
            }}
            className="category-search-input"
          />
        </div>
        <select
          value={status}
          onChange={(e) => setstatus(e.target.value)}
          className="category-search-select"
        >
          <option value="">Status</option>
          <option value="active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="category-cards-container">
        <div className="category-cards-grid">
          {loading ? (
            <div className="w-full flex justify-center items-center py-10">
              <FaSpinner className="animate-spin text-3xl" />
            </div>
          ) : categoryies.length > 0 ? (
            categoryies.map((item) => (
              <div key={item._id}>
                <CategoryCard
                  item={item}
                  deletedata={deletedata}
                  updatedata={updatedata}
                  from={from}
                  setFrom={setFrom}
                  formdata={formdata}
                  setFormdata={setFormdata}
                  editdata={editdata}
                  seteditdata={seteditdata}
                />
              </div>
            ))
          ) : (
            <div className="w-full flex flex-col items-center justify-center py-16 px-4">
              <FaSpinner className="text-4xl text-gray-300 mb-4" />
              <h2 className="text-center text-gray-500 text-lg">
                No Categories Found
              </h2>
              <p className="text-center text-gray-400 text-sm mt-1">
                Get started by adding your first category
              </p>
              <button
                onClick={() => {
                  setFrom(true);
                  seteditdata(null);
                  setFormdata({
                    cartegoryname: "",
                    slug: "",
                    status: "",
                    Img: null,
                  });
                }}
                className="mt-4 px-6 py-2 bg-[#e8521a] text-white rounded-lg hover:bg-[#dc4a1a] transition-colors"
              >
                Add Category
              </button>
            </div>
          )}
        </div>
        <div className="pagination-wrapper">
          <Pagination page={page} setpage={setpage} totalpage={totalpage} />
        </div>
      </div>

      {from && (
        <CategoryForm
          from={from}
          setFrom={setFrom}
          formdata={formdata}
          setFormdata={setFormdata}
          postdata={postdata}
          getdat={getdata}
          editdata={editdata}
          seteditdata={seteditdata}
          updatedata={updatedata}
        />
      )}
    </div>
  );
};

export default Categories;
