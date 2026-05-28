import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Categorycard = ({ item, deletedata }) => {
  return (
    <div className="category-cards">
      <img src={item.Img} />
      <div className="card-all">
        <h3 className="text-1xl ">{item.Categoryname}</h3>
        <h6 className="text-[#717182] text-sm">product 300</h6>
      </div>
      <div className="editdiv">
        <button className="flex items-center gap-1.5 cursor-pointer">
          <FaEdit /> Edit
        </button>
        <button onClick={() => deletedata(item._id)}>
          <FaTrash className="text-[#EF4444] cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default Categorycard;
