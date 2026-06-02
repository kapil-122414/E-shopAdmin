import React from "react";
import Categoryfrom from "../froms/categoryfrom";

import Categoryhooks from "../Hooks/categoryhooks";
import Pagination from "../pagination/pagination";
import Categorycard from "../cards/categorycard";
import { FaSpinner } from "react-icons/fa";
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
  } = Categoryhooks();

  return (
    <div className="categories">
      <div className="categoy-head">
        <div>
          <h1>Category Management</h1>
          <h3 className="text-[#717182] text-sm ">
            Organize your products into categories
          </h3>
        </div>
        <div
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
        >
          <h6>+ Add Category</h6>
        </div>
      </div>

      <div className="all-cards">
        <div className="all-cards-search">
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => {
              setpage(1);
              setSearch(e.target.value);
            }}
          />
          <select value={status} onChange={(e) => setstatus(e.target.value)}>
            <option value="">status</option>
            <option value="active">active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="categorycard">
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <FaSpinner className="animate-spin text-3xl" />
            </div>
          ) : categoryies.length > 0 ? (
            categoryies.map((item) => {
              return (
                <div key={item._id}>
                  <Categorycard
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
              );
            })
          ) : (
            <h1 className="text-center py-10 text-gray-500">
              No Categories Found
            </h1>
          )}
        </div>
        <div>
          <Pagination page={page} setpage={setpage} totalpage={totalpage} />
        </div>
      </div>

      {from && (
        <Categoryfrom
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
