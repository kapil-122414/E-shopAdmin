import React, { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
const brandfrom = ({ form, setform, fromdata, setfromdata }) => {
  const onsubmit = (e) => {
    e.preventDefault();
  };
  const onchage = (e) => {
    const { name, value } = e.target;
    setfromdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    console.log(fromdata);
  }, [fromdata]);
  return (
    <div className="brandfrom">
      <form onSubmit={onsubmit}>
        <FaArrowLeft
          className="text-2xl cursor-pointer"
          onClick={() => setform(false)}
        />
        <h1>Add New Brand</h1>
        <label>Brand Name</label>
        <input
          type="text"
          placeholder="Enter brand name"
          name="name"
          value={fromdata.name}
          onChange={onchage}
        />
        <label>Description</label>
        <textarea
          name="description"
          value={fromdata.description}
          onChange={onchage}
          placeholder="Brief description of the brand"
          className="border border-gray-300 rounded-lg p-10 outline-none resize-none "
          rows="4"
        ></textarea>
        <select onChange={onchage} value={fromdata.status} name="status">
          <option value="">Status</option>
          <option value="active">Active</option>
          <option value="low stock">Low stock</option>
          <option value="out of stock">Out of stock</option>
        </select>
        <label>Brand logo</label>
        <input type="file" placeholder="select brand img" />
        <div className="flex gap-3">
          <button type="button" onClick={() => setform(false)}>
            cancel
          </button>
          <button type="submit" className="bg-[#E8521A]">
            Create brand
          </button>
        </div>
      </form>
    </div>
  );
};

export default brandfrom;
