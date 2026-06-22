import React from "react";
import { FiEye, FiEdit } from "react-icons/fi";
const ordertable = ({ showdata }) => {
  return (
    <div className="order-table">
      <div className="order-search">
        <input
          type="text"
          placeholder=" Search by order ID, customer, or email..."
        />
        <select>
          <option>status</option>
          <option>panding</option>

          <option>cancelled</option>
          <option>shipped</option>
          <option>Out for Delivery</option>
          <option>Delivered</option>
        </select>
      </div>
      <div className="h-[400px] overflow-auto ">
        <table class="w-full overflow-auto">
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
            {showdata.map((item) => (
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
                    <FiEye />
                    <FiEdit className="text-[#E8521A]" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ordertable;
