import React from "react";
import { FaArrowLeft, FaMapMarkerAlt, FaPhone, FaUser, FaBox, FaRupeeSign, FaCalendarAlt, FaTruck, FaCheckCircle, FaTimesCircle, FaClock, FaSpinner } from "react-icons/fa";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-800",
  shipped: "bg-blue-100 text-blue-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  "out for delivery": "bg-pink-100 text-pink-800",
};

const ViewOrder = ({ viewdata, setview, loading }) => {
  console.log("=== VIEWORDER PROPS ===");
  console.log("viewdata:", viewdata);
  console.log("loading:", loading);
  console.log("========================");
  
  if (!viewdata && !loading) return null;

  if (loading) {
    return (
      <div className="vieworder">
        <div className="view-modal-overlay">
          <div className="view-modal">
            <div className="view-modal-header">
              <FaArrowLeft className="view-modal-close" onClick={() => setview(false)} />
              <h1 className="view-modal-title">Order Details</h1>
            </div>
            <div className="view-modal-body">
              <div className="flex justify-center items-center py-10">
                <FaSpinner className="animate-spin text-3xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const order = viewdata;
  const items = order.items || [];
  const shipping = order.shippingAddress || {};
  const user = order.userid || {};

  return (
    <div className="vieworder">
      <div className="view-modal-overlay" onClick={() => setview(false)}>
        <div className="view-modal" onClick={(e) => e.stopPropagation()}>
          <div className="view-modal-header">
            <FaArrowLeft className="view-modal-close" onClick={() => setview(false)} />
            <h1 className="view-modal-title">Order Details</h1>
            <span className={`status-badge ${statusStyles[order.status?.toLowerCase()] || "bg-gray-100 text-gray-800"}`}>
              {order.status}
            </span>
          </div>

          <div className="view-modal-body">
            <div className="order-section">
              <h3 className="section-title">
                <FaUser className="section-icon" /> Customer Information
              </h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>Name</label>
                  <p>{shipping.name || "N/A"}</p>
                </div>
                <div className="info-item">
                  <label>Email</label>
                  <p>{user.Email || shipping.email || "N/A"}</p>
                </div>
                <div className="info-item">
                  <label>Phone</label>
                  <p>{shipping.Phoneno || shipping.phone || "N/A"}</p>
                </div>
                <div className="info-item">
                  <label>Order ID</label>
                  <p className="font-mono">ORD-{order._id?.slice(-8)}</p>
                </div>
              </div>
            </div>

            <div className="order-section">
              <h3 className="section-title">
                <FaMapMarkerAlt className="section-icon" /> Shipping Address
              </h3>
<div className="address-block">
                 <p>{shipping.address || "N/A"}</p>
                 <p>{shipping.city || ""}, {shipping.state || ""} {shipping.pinecode || shipping.pincode || ""}</p>
                 <p>{shipping.country || "India"}</p>
               </div>
            </div>

            <div className="order-section">
              <h3 className="section-title">
                <FaCalendarAlt className="section-icon" /> Order Timeline
              </h3>
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <span className="timeline-label">Order Placed</span>
                    <span className="timeline-time">{new Date(order.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                {order.status !== "pending" && (
                  <div className="timeline-item">
                    <div className="timeline-dot filled" />
                    <div className="timeline-content">
                      <span className="timeline-label">Processing</span>
                      <span className="timeline-time">{order.updatedAt ? new Date(order.updatedAt).toLocaleString() : "N/A"}</span>
                    </div>
                  </div>
                )}
                {["shipped", "out for delivery", "delivered"].includes(order.status?.toLowerCase()) && (
                  <div className="timeline-item">
                    <div className="timeline-dot filled" />
                    <div className="timeline-content">
                      <span className="timeline-label">Shipped</span>
                      <span className="timeline-time">{order.shippedAt ? new Date(order.shippedAt).toLocaleString() : "N/A"}</span>
                    </div>
                  </div>
                )}
                {["out for delivery", "delivered"].includes(order.status?.toLowerCase()) && (
                  <div className="timeline-item">
                    <div className="timeline-dot filled" />
                    <div className="timeline-content">
                      <span className="timeline-label">Out for Delivery</span>
                      <span className="timeline-time">{order.outForDeliveryAt ? new Date(order.outForDeliveryAt).toLocaleString() : "N/A"}</span>
                    </div>
                  </div>
                )}
                {order.status?.toLowerCase() === "delivered" && (
                  <div className="timeline-item">
                    <div className="timeline-dot filled" />
                    <div className="timeline-content">
                      <span className="timeline-label">Delivered</span>
                      <span className="timeline-time">{order.deliveredAt ? new Date(order.deliveredAt).toLocaleString() : "N/A"}</span>
                    </div>
                  </div>
                )}
                {order.status?.toLowerCase() === "cancelled" && (
                  <div className="timeline-item">
                    <div className="timeline-dot cancelled" />
                    <div className="timeline-content">
                      <span className="timeline-label">Cancelled</span>
                      <span className="timeline-time">{order.cancelledAt ? new Date(order.cancelledAt).toLocaleString() : "N/A"}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="order-section">
              <h3 className="section-title">
                <FaBox className="section-icon" /> Order Items ({items.length})
              </h3>
              <div className="overflow-x-auto">
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
{items.map((item, index) => (
                       <tr key={index}>
                         <td>
                           <div className="product-cell">
                             {item.productid?.images?.[0]?.url && (
                               <img src={item.productid.images[0].url} alt={item.name} className="product-thumb" />
                             )}
                             <div>
                               <p className="product-name">{item.name}</p>
                               {item.productid?.Productname && <p className="product-sku">SKU: {item.productid.Productname}</p>}
                             </div>
                           </div>
                         </td>
                         <td>₹{item.price}</td>
                         <td>{item.quantity || item.Quantity}</td>
                         <td className="font-semibold">₹{item.totalPrice || item.totalprice}</td>
                       </tr>
                     ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="order-section">
              <h3 className="section-title">
                <FaRupeeSign className="section-icon" /> Order Summary
              </h3>
<div className="summary-grid">
                 <div className="summary-row">
                   <span>Subtotal ({items.length} items)</span>
                   <span>₹{items.reduce((sum, item) => sum + (item.totalPrice || item.totalprice || 0), 0)}</span>
                 </div>
                 <div className="summary-row">
                   <span>Shipping</span>
                   <span>₹{order.shippingCost || 0}</span>
                 </div>
                 <div className="summary-row">
                   <span>Discount</span>
                   <span className="text-green-600">-₹{order.discount || 0}</span>
                 </div>
                 <div className="summary-row total">
                   <span>Grand Total</span>
                   <span>₹{order.totalamount}</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;