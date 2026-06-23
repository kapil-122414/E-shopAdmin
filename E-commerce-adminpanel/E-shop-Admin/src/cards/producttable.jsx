import React from "react";
import { FaSearch, FaEye, FaEdit, FaTrash, FaSpinner } from "react-icons/fa";
import Pagination from "../pagination/pagination";
import Viewproduct from "./viewproduct";
const producttable = ({
  from,
  setfrom,
  productdata,
  setProductdata,
  search,
  setSearch,
  status,
  setstatus,
  totalpage,
  settotalpage,
  loading,
  page,
  setpage,
  prodelete,
  proedit,
  view,
  setview,
  productview,
  viewdata,
}) => {
  return (
    <div className="product-table">
      <div className="product-search">
        <div className="flex gap-2.5 items-center pr ">
          <FaSearch className="text-4 " />
          <input
            type="text"
            placeholder="Search name, category or sku"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select value={status} onChange={(e) => setstatus(e.target.value)}>
          <option value="">Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of stock">Out of Stock</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <FaSpinner className="animate-spin text-3xl" />
        </div>
      ) : (
        <>
          <div className="overflow-auto">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Category</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>status</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
                {productdata.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <img
                          src={item.Img?.url}
                          alt=" not show"
                          className="h-10 w-10 rounded-lg object-center  object-cover "
                        />
                        <span className="font-medium text-[#1A1A2E]">
                          {item.Productname}
                        </span>
                      </div>
                    </td>

                    <td className="text-[#717182] darks">
                      {item.variant[0].sku}
                    </td>
                    <td>{item.categoryId?.Categoryname}</td>
                    <td>{item.brand?.name}</td>
                    <td>{item.price}</td>
                    <td>{item.stock}</td>
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
                      <div className="flex gap-2.5">
                        <FaEye
                          className="cursor-pointer"
                          onClick={() => {
                            setview(true);
                            productview(item._id);
                          }}
                        />
                        <FaEdit
                          className="cursor-pointer"
                          onClick={() => {
                            proedit(item._id);
                          }}
                        />
                        <FaTrash
                          onClick={() => prodelete(item._id)}
                          className="text-[#EF4444] cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <Pagination totalpage={totalpage} page={page} setpage={setpage} />
          </div>
          {view && <Viewproduct viewdata={viewdata} setview={setview} />}
        </>
      )}
    </div>
  );
};

export default producttable;
