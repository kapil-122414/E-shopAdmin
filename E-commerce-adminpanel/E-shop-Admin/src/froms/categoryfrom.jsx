import React, { useEffect } from "react";

import { useState } from "react";

const Categoryfrom = ({
  setFrom,
  formdata,
  setFormdata,
  postdata,

  editdata,
  seteditdata,
  updatedata,
}) => {
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
  useEffect(() => {
    if (editdata && typeof formdata.Img === "string") {
      setPreview(formdata.Img);
    }
  }, [editdata, formdata.Img]);

  const onhandlesubmit = async (e) => {
    try {
      e.preventDefault();

      if (editdata) {
        await updatedata(editdata._id);
      } else {
        await postdata();
      }

      // Reset sab kuch
      setFormdata({ cartegoryname: "", slug: "", status: "", Img: null });
      setPreview("");
      seteditdata(null);
      setFrom(false); // ✅ Yeh last mein call ho raha hai — sahi hai
    } catch (error) {
      console.log("SUBMIT ERROR :", error);
      // ⚠️ Error aane pe form band nahi hoga — intentional hai
    }
  };

  return (
    <div className="categoryfrom">
      <form onSubmit={onhandlesubmit}>
        <h1 className="text-lg ">
          {editdata ? "Edit Category" : "Add New Categories"}
        </h1>
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
        <label>Current Image</label>

        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-full h-24 object-cover rounded"
          />
        )}

        <input
          type="file"
          name="Img"
          required={!editdata}
          accept="image/*"
          onChange={handleImg}
        />
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              setFrom(false);

              seteditdata(null);

              setFormdata({
                cartegoryname: "",
                slug: "",
                status: "",
                Img: null,
              });

              setPreview("");
            }}
          >
            Cancel
          </button>
          <button type="submit">
            {editdata ? "Edit Category" : "Create Category"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Categoryfrom;
