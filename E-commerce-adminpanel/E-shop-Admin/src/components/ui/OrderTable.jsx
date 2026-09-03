import React, { useState } from "react";
import Pagination from "../common/Pagination";
import { FiEye, FiEdit, FiSearch } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";
import EditOrder from "./EditOrder";

const ordertable = ({ showdata, search, setsearch, status, setstatus, loading, onView, onRefresh, page, setpage, totalPages }) => {
  const [editOrder, setEditOrder] = useState(null);

  const handleEdit = (order) => {
    setEditOrder(order);
  };

  const handleEditClose = () => {
    setEditOrder(null);
  };

  const handleEditSuccess = () => {
    if (onRefresh) onRefresh();
  };

  return (
    <div className="order-table">
      <div className="order-search">
        <div className="order-search-input-wrapper">
          <FiSearch className="order-search-icon" />
          <input
            type="text"
            placeholder="Search by order ID, customer, or email..."
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            className="order-search-input"
          />
        </div>
        <select value={status} onChange={(e) => setstatus(e.target.value)} className="order-search-select">
          <option value="">Status</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
          <option value="shipped">Shipped</option>
          <option value="Out for Delivery">Out for Delivery</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>
      <div className="overflow-auto">
        <table className="w-full" style={{minWidth: '800px'}}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date </th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7}>
                  <div className="flex justify-center items-center py-10">
                    <FaSpinner className="animate-spin text-3xl" />
                  </div>
                </td>
              </tr>
            ) : (
              showdata.map((item) => (
                <tr key={item._id}>
                <td>ORD-{item._id.slice(-6)}</td>
                <td>
                  <div>
                    <p>{item.shippingAddress?.name}</p>
                    <p>{item.userid?.Email}</p>
                  </div>
                </td>
                <td>{item.items.length} </td>
                <td>{item.totalamount}</td>
                <td>
                  <div
                    className={
                      item.status == "pending"
                        ? "text-red-600 "
                        : item.status == "delivered"
                          ? "text-[#22C55E]  "
                          : item.status == "cancelled"
                            ? "text-gray-500"
                            : item.status == "shipped"
                              ? "text-blue-500"
                              : "text-pink-500"
                    }
                  >
                    {item.status}
                  </div>
                </td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="flex gap-1.5">
                    <FiEye onClick={() => onView?.(item._id)} style={{ cursor: "pointer" }} />
                    <FiEdit onClick={() => handleEdit(item)} style={{ color: "var(--primary-text)", cursor: "pointer" }} />
                  </div>
                </td>
              </tr>
              ))
            )}
          </tbody>
        </table>
        <div>
          <Pagination page={page} setpage={setpage} totalpage={totalPages} />
        </div>
      </div>

      <EditOrder
        order={editOrder}
        onClose={handleEditClose}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
};

export default ordertable;
