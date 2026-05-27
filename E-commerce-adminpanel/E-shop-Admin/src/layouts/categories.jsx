import React from "react";
import Categoryfrom from "../froms/categoryfrom";
import Categoryhooks from "../Hooks/categoryhooks";
import { categoryget } from "../service/categoryapi";
import Categorycard from "../cards/categorycard";
const Categories = () => {
  const { from, setFrom, formdata, setFormdata, getdata } = Categoryhooks();

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

      <div className="all-cards">
        <div className="all-cards-search">
          <input type="text" placeholder="search categorys ..." />
          <select>
            <option>status</option>
            <option>active</option>
            <option>Inactive</option>
          </select>
        </div>
        <div className="categorycard">
          <Categorycard />

          <Categorycard />
        </div>
      </div>

      {from && (
        <Categoryfrom
          from={from}
          setFrom={setFrom}
          formdata={formdata}
          setFormdata={setFormdata}
        />
      )}
    </div>
  );
};

export default Categories;
