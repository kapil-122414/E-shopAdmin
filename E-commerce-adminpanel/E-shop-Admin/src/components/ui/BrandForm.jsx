import React, { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
const brandfrom = ({
  form,
  setform,
  fromdata,
  setfromdata,
  image,
  setimage,
  brandcreate,
  resetfrom,
  preview,
  setPreview,
  update_brand,
  editid,
  getedit,
}) => {
  const onhandleimg = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setimage(file);
    setPreview(URL.createObjectURL(file));
  };

  const onsubmit = async (e) => {
    e.preventDefault();
    if (!fromdata.name) {
      return alert("Brand name is required");
    }

    if (!fromdata.status) {
      return alert("Please select status");
    }

    if (getedit) {
      update_brand(getedit);
    } else {
      if (!image) {
        return alert("Please select image");
      }
      brandcreate();
    }
  };
  const onchage = (e) => {
    const { name, value } = e.target;
    setfromdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {}, [fromdata]);
  useEffect(() => {
    if (typeof image === "string") {
      setPreview(image);
    }
  }, [image]);
  return (
    <div className="brandfrom">
      <form onSubmit={onsubmit}>
        <FaArrowLeft
          className="text-2xl cursor-pointer"
          onClick={() => {
            setform(false);
            resetfrom();
          }}
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
            accept="image/*"
          />
        )}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              setform(false);
              resetfrom();
            }}
          >
            cancel
          </button>

          <button type="submit" className="bg-[#E8521A]">
            {getedit ? "Update brnad" : "Create brand"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default brandfrom;
