import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../features/dashboard/DashboardPage";
import Product from "../features/products/ProductPage";
import Categories from "../features/categories/CategoriesPage";
import Orders from "../features/orders/OrdersPage";
import Brands from "../features/brands/BrandsPage";
import Analytics from "../features/analytics/AnalyticsPage";
import Settings from "../features/settings/SettingsPage";
import Customers from "../features/customers/CustomersPage";

const Routers = ({ search }) => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/products" element={<Product search={search} />} />
      <Route path="/categories" element={<Categories search={search} />} />
      <Route path="/brands" element={<Brands search={search} />} />
      <Route path="/orders" element={<Orders search={search} />} />
      <Route path="/customers" element={<Customers search={search} />} />
      <Route path="/analytics" element={<Analytics search={search} />} />
      <Route path="/setting" element={<Settings search={search} />} />
    </Routes>
  );
};

export default Routers;
