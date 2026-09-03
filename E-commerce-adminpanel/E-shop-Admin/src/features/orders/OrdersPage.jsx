import React, { useState, useEffect } from "react";
import { FiDownload } from "react-icons/fi";
import OrderTable from "../../components/ui/OrderTable";
import useOrders from "./useOrders";
import ViewOrder from "../../components/ui/ViewOrder";
import { getOrderById, getapi } from "./api";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const Orders = () => {
  const { showdata, setshowdata, search, setsearch, status, setstatus, loading, page, setpage, totalPages } =
    useOrders();
  const [viewOrder, setViewOrder] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);
  const [sort, setSort] = useState("-createdAt");
  const [exportLoading, setExportLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await getapi(search, status, page, 4, sort, startDate, endDate);
        setshowdata(res.data.allorder);
      } catch (error) {
        console.error("Failed to load orders:", error);
      }
    };
    loadOrders();
  }, [search, status, sort, startDate, endDate, page, setshowdata]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setpage(1);
  }, [search, status, sort, startDate, endDate, setpage]);

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

const handleExportPDF = async () => {
    setExportLoading(true);
    try {
      const res = await getapi(search, status, 1, 1000, sort, startDate, endDate);
      const orders = res.data.allorder || [];
      
      console.log("Export data:", orders);

      if (orders.length === 0) {
        alert("No orders to export");
        setExportLoading(false);
        return;
      }

      const doc = new jsPDF("landscape");
      doc.setFontSize(18);
      doc.text("Orders Report", 14, 20);
      doc.setFontSize(10);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28);
      doc.text(`Total Orders: ${orders.length}`, 14, 34);

      const tableData = orders.map((order, index) => [
        index + 1,
        `ORD-${order._id?.slice(-8)}`,
        order.shippingAddress?.name || "N/A",
        order.userid?.Email || "N/A",
        order.shippingAddress?.Phoneno || order.shippingAddress?.phone || "N/A",
        `${order.shippingAddress?.address || ""}, ${order.shippingAddress?.city || ""}, ${order.shippingAddress?.state || ""} ${order.shippingAddress?.pinecode || order.shippingAddress?.pincode || ""}`.trim() || "N/A",
        order.items?.length || 0,
        `₹${order.totalamount || 0}`,
        order.status || "N/A",
        order.paymentstatus || "N/A",
        new Date(order.createdAt).toLocaleDateString(),
      ]);

      autoTable(doc, {
        startY: 42,
        head: [["#", "Order ID", "Customer", "Email", "Phone", "Address", "Items", "Total", "Status", "Payment", "Date"]],
        body: tableData,
        styles: { fontSize: 6.5, cellPadding: 2 },
        headStyles: { fillColor: [232, 82, 26] },
        alternateRowStyles: { fillColor: [249, 250, 251] },
        margin: { left: 10, right: 10 },
        columnStyles: {
          5: { cellWidth: 60 },
        },
      });

      doc.save(`orders-report-${new Date().toISOString().split("T")[0]}.pdf`);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export PDF: " + error.message);
    } finally {
      setExportLoading(false);
    }
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
  };

  const handleRefresh = async () => {
    try {
      const res = await getapi(search, status, 1, 4, sort, startDate, endDate);
      setshowdata(res.data.allorder);
    } catch (error) {
      console.error("Refresh failed:", error);
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

        <div className="order-header-actions">
          <div className="order-date-filter">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="order-date-input"
              placeholder="From"
            />
            <span>to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="order-date-input"
              placeholder="To"
            />
            {(startDate || endDate) && (
              <button
                type="button"
                onClick={() => { setStartDate(""); setEndDate(""); }}
                className="order-date-clear"
              >
                Clear
              </button>
            )}
          </div>
          <select
            value={sort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="order-sort-select"
            title="Sort orders"
          >
            <option value="-createdAt">Newest First</option>
            <option value="createdAt">Oldest First</option>
            <option value="-totalamount">Highest Amount</option>
            <option value="totalamount">Lowest Amount</option>
            <option value="-updatedAt">Recently Updated</option>
          </select>
          <button className="export-btn flex items-center gap-2" onClick={handleExportPDF} disabled={exportLoading}>
            <FiDownload size={18} />
            <span>{exportLoading ? "Exporting..." : "Export PDF"}</span>
          </button>
        </div>
      </div>
      <OrderTable
        showdata={showdata}
        search={search}
        setsearch={setsearch}
        status={status}
        setstatus={setstatus}
        loading={loading}
        onView={handleView}
        onRefresh={handleRefresh}
        page={page}
        setpage={setpage}
        totalPages={totalPages}
      />
      <ViewOrder viewdata={viewOrder} setview={() => setViewOrder(null)} loading={viewLoading} />
    </div>
  );
};

export default Orders;
