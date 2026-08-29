import React from "react";
import { FiDownload } from "react-icons/fi";
import OrderTable from "../../components/ui/OrderTable";
import useOrders from "./useOrders";
const Orders = () => {
  const { showdata, setshowdata, search, setsearch, status, setstatus, loading } =
    useOrders();
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
      />
    </div>
  );
};

export default Orders;
