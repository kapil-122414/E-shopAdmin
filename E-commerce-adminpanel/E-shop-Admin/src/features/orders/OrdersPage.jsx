import React, { useState } from "react";
import { FiDownload } from "react-icons/fi";
import OrderTable from "../../components/ui/OrderTable";
import useOrders from "./useOrders";
import ViewOrder from "../../components/ui/ViewOrder";
import { getOrderById } from "./api";

const Orders = () => {
  const { showdata, setshowdata, search, setsearch, status, setstatus, loading } =
    useOrders();
  const [viewOrder, setViewOrder] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);

  const handleView = async (orderId) => {
    setViewLoading(true);
    try {
      const res = await getOrderById(orderId);
      console.log("=== FULL ORDER RESPONSE ===");
      console.log("res:", res);
      console.log("res.data:", res.data);
      console.log("res.data.data:", res.data?.data);
      console.log("=============================");
      setViewOrder(res.data?.data || res.data);
    } catch (error) {
      console.error("Failed to fetch order:", error);
      console.error("Error response:", error.response?.data);
      alert("Failed to load order details");
    } finally {
      setViewLoading(false);
    }
  };

  return (
    <div>
      <div className="order-header">
        <div>
          <h1>Orders Management</h1>
          <p className="text-[#717182] text-sm">
            Track and manage customer orders
          </p>
        </div>

        <button className="export-btn flex items-center gap-2">
          <FiDownload size={18} />
          <span>Export Orders</span>
        </button>
      </div>
      <OrderTable
        showdata={showdata}
        search={search}
        setsearch={setsearch}
        status={status}
        setstatus={setstatus}
        loading={loading}
        onView={handleView}
        onRefresh={() => setshowdata(prev => prev)}
      />
      <ViewOrder viewdata={viewOrder} setview={() => setViewOrder(null)} loading={viewLoading} />
    </div>
  );
};

export default Orders;
