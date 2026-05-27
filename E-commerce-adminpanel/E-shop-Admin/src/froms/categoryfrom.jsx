import React from "react";
import { Form } from "react-router-dom";
import { useState } from "react";
const Categoryfrom = ({ from, setFrom, formdata, setFormdata }) => {
  const [preview, setPreview] = useState("");
  const onhandchange = (e) => {
    const { name, value } = e.target;
    if (name === "cartegoryname") {
      const slug = value.toLowerCase().replaceAll(" ", "-");
      setFormdata({
        ...formdata,
        cartegoryname: value,
        slug: slug,
      });
    } else {
      setFormdata({
        ...formdata,
        [name]: value,
      });
    }
  };

  const handleImg = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormdata({
        ...formdata,
        Img: file,
      });
      setPreview(URL.createObjectURL(file));
    }
  };

  const onhandlesubmit = (e) => {
    e.preventDefault();
    setFormdata({
      cartegoryname: "",
      slug: "",
      status: "",
      Img: null,
    });
    setPreview("");
    setFrom(false);
  };

  return (
    <div className="categoryfrom">
      <form onSubmit={onhandlesubmit}>
        <h1 className="text-lg ">Add New Categories</h1>
        <label>Category Name</label>
        <input
          required
          type="text"
          placeholder="enter category"
          name="cartegoryname"
          value={formdata.cartegoryname}
          onChange={onhandchange}
        />
        <label>Slug</label>
        <input
          type="text"
          placeholder="category-Slug"
          name="slug"
          value={formdata.slug}
          onChange={onhandchange}
        />
        <label>Status</label>
        <select name="status" value={formdata.status} onChange={onhandchange}>
          <option value="">Status</option>
          <option value="active">Active</option>
          <option value="Inactive">InActive</option>
        </select>
        <label>Category image</label>
        <input
          required
          type="file"
          name="Img"
          accept="image/*"
          placeholder="Click to upload image"
          onChange={handleImg}
        />
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-full h-20 object-cover rounded"
          />
        )}
        <div className="flex gap-3">
          <button type="button" onClick={() => setFrom(false)}>
            Cancel
          </button>
          <button type="submit">Create Category</button>
        </div>
      </form>
    </div>
  );
};

export default Categoryfrom;
