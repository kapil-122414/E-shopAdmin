import React from "react";
import { FaEdit, FaTrash, FaSpinner } from "react-icons/fa";

const brandtable = ({ getdata, setgetdata, brand_delete, loading, editid }) => {
  return (
    <div className="brand-table">
      <div>
        <input type="text" placeholder="Search brands ...." />
      </div>
      <table className="w-full overflow-auto">
        <thead>
          <tr>
            <th>Brand</th>
            <th>Total product</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <FaSpinner className="animate-spin text-3xl" />
          </div>
        ) : (
          <tbody>
            {getdata.map((item) => (
              <tr key={item._id}>
                <td>
                  <div className="flex gap-2">
                    <img src={item.Img.url} className="h-10 w-10  " />
                    <h3>{item.name}</h3>
                  </div>
                </td>
                <td>{item.productcount}</td>
                <td
                  className={
                    item.status == "active"
                      ? "text-green-400 font-semibold"
                      : item.status === "low stock"
                        ? "text-yellow-300 font-semibold"
                        : "text-[#EF4444] font-semibold"
                  }
                >
                  {item.status}
                </td>
                <td>
                  <div className="flex gap-2">
                    <FaEdit
                      className="cursor-pointer text-3"
                      onClick={() => {
                        editid(item._id);
                      }}
                    />
                    <FaTrash
                      className="text-[#EF4444] text-3 cursor-pointer"
                      onClick={() => {
                        brand_delete(item._id);
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default brandtable;
