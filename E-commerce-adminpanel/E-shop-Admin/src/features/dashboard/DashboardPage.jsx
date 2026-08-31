import React, { useEffect, useState } from "react";
import { getDashboardStats } from "../products/api";
import { FaBox, FaShoppingCart, FaUsers, FaDollarSign, FaExclamationTriangle, FaChartLine, FaArrowUp } from "react-icons/fa";

const StatCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-white dark:bg-[#1e293b] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
        {trend && (
          <p className="text-sm text-[#E8521A] dark:text-[#E8521A] mt-1 flex items-center gap-1">
            <FaArrowUp size={14} /> {trend}
          </p>
        )}
      </div>
      <div className="p-3 rounded-xl bg-[#E8521A]/10">
        <Icon size={28} className="text-[#E8521A]" />
      </div>
    </div>
  </div>
);

const RecentOrdersTable = ({ orders }) => (
  <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
    <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h3>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
          {orders.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">No recent orders</td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">#{order._id.toString().slice(-8).toUpperCase()}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{order.userid?.Email || "Unknown"}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">${order.totalamount.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    order.status === "delivered" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" :
                    order.status === "shipped" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" :
                    order.status === "pending" ? "bg-[#E8521A]/10 text-[#E8521A] dark:bg-[#E8521A]/20" :
                    "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);

const LowStockTable = ({ products }) => (
  <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
    <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Low Stock Products</h3>
      <FaExclamationTriangle className="text-[#E8521A]" size={20} />
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Product</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stock</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
          {products.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">All products well stocked</td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{product.Productname}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-[#E8521A]/10 text-[#E8521A] dark:bg-[#E8521A]/20">
                    {product.stock} left
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">${product.price}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);

const RevenueChart = ({ data }) => {
  if (!data || data.length === 0) return null;
  
  const maxRevenue = Math.max(...data.map(d => d.revenue));
  
  return (
    <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Revenue Overview (Last 12 Months)</h3>
      <div className="flex items-end justify-between h-64 gap-2">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div 
              className="w-full bg-[#E8521A] rounded-t transition-all duration-300 hover:opacity-80"
              style={{ height: `${maxRevenue > 0 ? (item.revenue / maxRevenue) * 100 : 0}%` }}
            />
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {new Date(item._id.year, item._id.month - 1).toLocaleDateString('en-US', { month: 'short' })}
            </span>
            <span className="text-xs font-medium text-gray-900 dark:text-white mt-1">
              ${(item.revenue / 1000).toFixed(1)}k
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const OrdersStatusChart = ({ data }) => {
  if (!data || data.length === 0) return null;
  
  const total = data.reduce((sum, item) => sum + item.count, 0);
  
  return (
    <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Orders by Status</h3>
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item._id} className="flex items-center gap-4">
            <div className="w-24 text-sm font-medium text-gray-600 dark:text-gray-300 capitalize">
              {item._id}
            </div>
            <div className="flex-1 h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#E8521A] rounded-full transition-all duration-500"
                style={{ width: `${total > 0 ? (item.count / total) * 100 : 0}%` }}
              />
            </div>
            <div className="w-16 text-right text-sm font-medium text-gray-900 dark:text-white">
              {item.count} ({(total > 0 ? (item.count / total) * 100 : 0).toFixed(1)}%)
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await getDashboardStats();
        setStats(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Dashboard stats error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="h-full min-h-[calc(100vh-120px)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#E8521A] border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full min-h-[calc(100vh-120px)] flex items-center justify-center">
        <p className="text-red-500">Error loading dashboard: {error}</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="h-full min-h-[calc(100vh-120px)] flex items-center justify-center">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  const { stats: dashboardStats, recentOrders, lowStockProducts, monthlyRevenue, ordersByStatus } = stats;

  return (
    <div className="h-full min-h-[calc(100vh-120px)] p-6 space-y-6">
      <div className="categoy-head">
        <div>
          <h3>Dashboard</h3>
          <p className="text-[#717182] text-sm">
            Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Products"
          value={dashboardStats.totalProducts}
          icon={FaBox}
        />
        <StatCard
          title="Total Orders"
          value={dashboardStats.totalOrders}
          icon={FaShoppingCart}
        />
        <StatCard
          title="Total Customers"
          value={dashboardStats.totalCustomers}
          icon={FaUsers}
        />
        <StatCard
          title="Total Revenue"
          value={`$${dashboardStats.totalRevenue.toLocaleString()}`}
          icon={FaDollarSign}
        />
        <StatCard
          title="Categories"
          value={dashboardStats.totalCategories}
          icon={FaChartLine}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={monthlyRevenue} />
        <OrdersStatusChart data={ordersByStatus} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrdersTable orders={recentOrders} />
        <LowStockTable products={lowStockProducts} />
      </div>
    </div>
  );
};

export default Dashboard;