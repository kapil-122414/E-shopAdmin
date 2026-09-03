import React, { useState, useEffect, useCallback } from "react";
import { getCustomers, getCustomerById, updateCustomer, deleteCustomer } from "../products/api";
import {
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
  FaSort,
  FaSortUp,
  FaSortDown,
} from "react-icons/fa";

const CustomersPage = ({ search: initialSearch = "" }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalCustomers: 0,
    limit: 10,
  });
  const [search, setSearch] = useState(initialSearch);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    order: "desc",
  });
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getCustomers(
        pagination.page,
        search,
        pagination.limit,
        sortConfig.key,
        sortConfig.order,
      );
      setCustomers(response.data.data);
      setPagination((prev) => ({
        ...prev,
        totalPages: response.data.totalPages,
        totalCustomers: response.data.totalCustomers,
      }));
    } catch (err) {
      setError(err.message);
      console.error("Customers fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, search, sortConfig]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  useEffect(() => {
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, [search]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      order: prev.key === key && prev.order === "asc" ? "desc" : "asc",
    }));
  };

  const handleViewCustomer = async (customer) => {
    try {
      const response = await getCustomerById(customer._id);
      setSelectedCustomer(response.data.data);
      setShowModal(true);
    } catch (err) {
      console.error("Error fetching customer details:", err);
    }
  };

  const handleEditCustomer = (customer) => {
    // For now, just show an alert - you can replace with a modal/form
    const newEmail = prompt("Enter new email:", customer.Email);
    if (newEmail && newEmail !== customer.Email) {
      updateCustomer(customer._id, { Email: newEmail })
        .then(() => {
          fetchCustomers();
          alert("Customer updated");
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to update");
        });
    }
  };

  const handleDeleteCustomer = (customer) => {
    if (window.confirm(`Delete customer ${customer.Email}? This cannot be undone.`)) {
      setDeletingId(customer._id);
      deleteCustomer(customer._id)
        .then(() => {
          fetchCustomers();
          setDeletingId(null);
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to delete");
          setDeletingId(null);
        });
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey)
      return <FaSort className="text-gray-400 ml-1" size={14} />;
    return sortConfig.order === "asc" ? (
      <FaSortUp className="text-[#E8521A] ml-1" size={14} />
    ) : (
      <FaSortDown className="text-[#E8521A] ml-1" size={14} />
    );
  };

  if (loading && customers.length === 0) {
    return (
      <div className="h-full min-h-[calc(100vh-120px)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#E8521A] border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full min-h-[calc(100vh-120px)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error loading customers: {error}</p>
          <button
            onClick={fetchCustomers}
            className="px-4 py-2 bg-[#E8521A] text-white rounded-lg hover:opacity-90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full min-h-[calc(100vh-120px)] p-6 space-y-6">
      <div className="categoy-head">
        <div>
          <h3>Customers</h3>
          <p className="text-[#717182] text-sm">Manage your customers</p>
        </div>
        <div className="unified-search">
          <div className="unified-search-input-wrapper">
            <FaSearch
              className="unified-search-icon"
              size={18}
            />
            <input
              type="text"
              placeholder="Search customers by email..."
              value={search}
              onChange={handleSearch}
              className="unified-search-input"
            />
          </div>
        </div>
      </div>

      <div className="order-table">
        <div className="overflow-auto">
          <table style={{ minWidth: "800px" }}>
            <thead>
              <tr>
                {[
                  { key: "Email", label: "Email" },
                  { key: "totalOrders", label: "Orders" },
                  { key: "totalSpent", label: "Total Spent" },
                  { key: "lastOrderDate", label: "Last Order" },
                  { key: "createdAt", label: "Joined" },
                  { key: "actions", label: "Actions", sortable: false },
                ].map((col) => (
                  <th
                    key={col.key}
                    className={`${col.sortable !== false ? "cursor-pointer hover:text-[#E8521A] select-none" : ""}`}
                    onClick={() =>
                      col.sortable !== false && handleSort(col.key)
                    }
                  >
                    <div className="flex items-center">
                      {col.label}
                      {col.sortable !== false && (
                        <SortIcon columnKey={col.key} />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                  >
                    No customers found
                  </td>
                </tr>
              ) : (
                customers.map((customer) => (
                  <tr key={customer._id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#E8521A]/10 flex items-center justify-center">
                          <span className="text-[#E8521A] font-medium">
                            {customer.Email?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-[#1A1A2E] dark:text-white">
                            {customer.Email}
                          </p>
                          <p className="text-xs text-[#717182] dark:text-gray-400">
                            ID:{" "}
                            {customer._id.toString().slice(-8).toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#1A1A2E] dark:text-white">
                      {customer.totalOrders}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-[#1A1A2E] dark:text-white">
                      ${customer.totalSpent.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#717182] dark:text-gray-400">
                      {customer.lastOrderDate
                        ? new Date(customer.lastOrderDate).toLocaleDateString()
                        : "Never"}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#717182] dark:text-gray-400">
                      {new Date(customer.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewCustomer(customer)}
                          className="p-2 text-gray-500 hover:text-[#E8521A] dark:text-gray-400 dark:hover:text-[#E8521A] transition-colors"
                          title="View details"
                        >
                          <FaEye size={18} />
                        </button>
                        <button
                          onClick={() => handleEditCustomer(customer)}
                          className="p-2 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                          title="Edit"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteCustomer(customer)}
                          disabled={deletingId === customer._id}
                          className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Delete"
                        >
                          {deletingId === customer._id ? (
                            <span className="animate-spin">⟳</span>
                          ) : (
                            <FaTrash size={18} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {pagination.totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
              {Math.min(
                pagination.page * pagination.limit,
                pagination.totalCustomers,
              )}{" "}
              of {pagination.totalCustomers} customers
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
                }
                disabled={pagination.page === 1}
                className="px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FaChevronLeft size={16} />
              </button>
              <span className="px-3 py-1 text-sm font-medium text-gray-900 dark:text-white">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <button
                onClick={() =>
                  setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
                }
                disabled={pagination.page === pagination.totalPages}
                className="px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FaChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {showModal && selectedCustomer && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setShowModal(false)}
            />
            <div className="relative bg-white dark:bg-[#1e293b] rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Customer Details
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <FaChevronRight className="rotate-90" size={24} />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#E8521A]/10 flex items-center justify-center">
                    <span className="text-[#E8521A] font-bold text-2xl">
                      {selectedCustomer.Email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {selectedCustomer.Email}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Customer since{" "}
                      {new Date(
                        selectedCustomer.createdAt,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Total Orders
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedCustomer.totalOrders}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Total Spent
                    </p>
                    <p className="text-2xl font-bold text-[#E8521A]">
                      ${selectedCustomer.totalSpent.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    Recent Orders
                  </h4>
                  {selectedCustomer.orders &&
                  selectedCustomer.orders.length > 0 ? (
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {selectedCustomer.orders.slice(0, 5).map((order) => (
                        <div
                          key={order._id}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              Order #
                              {order._id.toString().slice(-8).toUpperCase()}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              ${order.totalamount.toFixed(2)}
                            </p>
                            <span
                              className={`px-2 py-0.5 text-xs rounded-full ${
                                order.status === "delivered"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  : order.status === "shipped"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                    : order.status === "pending"
                                      ? "bg-[#E8521A]/10 text-[#E8521A] dark:bg-[#E8521A]/20"
                                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              }`}
                            >
                              {order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">
                      No orders yet
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersPage;
