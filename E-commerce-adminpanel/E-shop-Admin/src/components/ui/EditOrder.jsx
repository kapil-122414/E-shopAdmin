import React, { useState, useEffect } from "react";
import { FaTimes, FaSpinner } from "react-icons/fa";
import { updateOrder } from "../../features/orders/api";

const statusOptions = [
  "pending",
  "shipped",
  "out for delivery",
  "delivered",
  "cancelled"
];

const paymentStatusOptions = [
  "panding",
  "paid",
  "failed",
  "refunded"
];

const EditOrder = ({ order, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    status: "",
    paymentstatus: "",
    shippingCost: 0,
    discount: 0,
    shippingAddress: {
      name: "",
      Phoneno: "",
      address: "",
      city: "",
      state: "",
      pinecode: "",
      country: "India"
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (order) {
      setFormData({
        status: order.status || "pending",
        paymentstatus: order.paymentstatus || "panding",
        shippingCost: order.shippingCost || 0,
        discount: order.discount || 0,
        shippingAddress: order.shippingAddress || {
          name: "",
          Phoneno: "",
          address: "",
          city: "",
          state: "",
          pinecode: "",
          country: "India"
        }
      });
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("shippingAddress.")) {
      const field = name.replace("shippingAddress.", "");
      setFormData(prev => ({
        ...prev,
        shippingAddress: { ...prev.shippingAddress, [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await updateOrder(order._id, formData);
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update order");
    } finally {
      setLoading(false);
    }
  };

  if (!order) return null;

  return (
    <div className="editorder-modal-overlay" onClick={onClose}>
      <div className="editorder-modal" onClick={(e) => e.stopPropagation()}>
        <div className="editorder-modal-header">
          <h2 className="editorder-modal-title">Edit Order</h2>
          <button className="editorder-modal-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="editorder-form">
          <div className="editorder-section">
            <h3 className="editorder-section-title">Order Status</h3>
            <div className="editorder-field">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="editorder-select">
                {statusOptions.map(s => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
            </div>
            <div className="editorder-field">
              <label>Payment Status</label>
              <select name="paymentstatus" value={formData.paymentstatus} onChange={handleChange} className="editorder-select">
                {paymentStatusOptions.map(s => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="editorder-section">
            <h3 className="editorder-section-title">Pricing</h3>
            <div className="editorder-field-row">
              <div className="editorder-field">
                <label>Shipping Cost (₹)</label>
                <input
                  type="number"
                  name="shippingCost"
                  value={formData.shippingCost}
                  onChange={handleChange}
                  className="editorder-input"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="editorder-field">
                <label>Discount (₹)</label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  className="editorder-input"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          <div className="editorder-section">
            <h3 className="editorder-section-title">Shipping Address</h3>
            <div className="editorder-field-row">
              <div className="editorder-field">
                <label>Name</label>
                <input
                  type="text"
                  name="shippingAddress.name"
                  value={formData.shippingAddress.name}
                  onChange={handleChange}
                  className="editorder-input"
                />
              </div>
              <div className="editorder-field">
                <label>Phone</label>
                <input
                  type="text"
                  name="shippingAddress.Phoneno"
                  value={formData.shippingAddress.Phoneno}
                  onChange={handleChange}
                  className="editorder-input"
                />
              </div>
            </div>
            <div className="editorder-field">
              <label>Address</label>
              <input
                type="text"
                name="shippingAddress.address"
                value={formData.shippingAddress.address}
                onChange={handleChange}
                className="editorder-input"
              />
            </div>
            <div className="editorder-field-row">
              <div className="editorder-field">
                <label>City</label>
                <input
                  type="text"
                  name="shippingAddress.city"
                  value={formData.shippingAddress.city}
                  onChange={handleChange}
                  className="editorder-input"
                />
              </div>
              <div className="editorder-field">
                <label>State</label>
                <input
                  type="text"
                  name="shippingAddress.state"
                  value={formData.shippingAddress.state}
                  onChange={handleChange}
                  className="editorder-input"
                />
              </div>
              <div className="editorder-field">
                <label>Pincode</label>
                <input
                  type="text"
                  name="shippingAddress.pinecode"
                  value={formData.shippingAddress.pinecode}
                  onChange={handleChange}
                  className="editorder-input"
                />
              </div>
            </div>
            <div className="editorder-field">
              <label>Country</label>
              <input
                type="text"
                name="shippingAddress.country"
                value={formData.shippingAddress.country}
                onChange={handleChange}
                className="editorder-input"
              />
            </div>
          </div>

          {error && <div className="editorder-error">{error}</div>}

          <div className="editorder-actions">
            <button type="button" className="editorder-btn cancel" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="editorder-btn save" disabled={loading}>
              {loading ? <FaSpinner className="animate-spin" /> : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOrder;