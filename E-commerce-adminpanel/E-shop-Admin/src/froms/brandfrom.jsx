import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
const brandfrom = ({
  form,
  setform,
  fromdata,
  setfromdata,
  image,
  setimage,
}) => {
  const [preview, setPreview] = useState("");

  const onhandleimg = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setimage(file);
    setPreview(URL.createObjectURL(file));
  };

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
        <label>Status</label>

        <select onChange={onchage} value={fromdata.status} name="status">
          <option value="">Status</option>
          <option value="active">Active</option>
          <option value="low stock">Low stock</option>
          <option value="out of stock">Out of stock</option>
        </select>
        <label>Brand logo</label>
        <input
          type="file"
          placeholder="select brand img"
          accept="image/*"
          onChange={onhandleimg}
        />
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-full h-24 object-cover rounded"
          />
        )}
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
