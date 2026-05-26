import React from "react";
import Categoryfrom from "../froms/categoryfrom";
import Categoryhooks from "../Hooks/categoryhooks";
const Categories = () => {
  const { from, setFrom } = Categoryhooks();
  console.log(from);
  return (
    <div className="categories">
      <div className="categoy-head">
        <div>
          <h1>Category Management</h1>
          <h3 className="text-[#717182] text-sm ">
            Organize your products into categories
          </h3>
        </div>
        <div onClick={() => setFrom(true)}>
          <h6>+ Add Category</h6>
        </div>
      </div>

      <div className="all-cards"></div>

      {from && <Categoryfrom />}
    </div>
  );
};

export default Categories;
