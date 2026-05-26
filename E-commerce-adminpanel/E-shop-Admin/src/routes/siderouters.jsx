import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../layouts/dashboard";
import Product from "../layouts/product";
import Categories from "../layouts/categories";
import Orders from "../layouts/orders";
import Brands from "../layouts/brands";
import Analytics from "../layouts/Analytics";
import Setting from "../layouts/Setting";
import Customers from "../layouts/customers";

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
      <Route path="/setting" element={<Setting search={search} />} />
    </Routes>
  );
};

export default Routers;
