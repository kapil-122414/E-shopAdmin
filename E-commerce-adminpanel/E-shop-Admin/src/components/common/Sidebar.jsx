import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import {
  FaTachometerAlt,
  FaBox,
  FaList,
  FaTag,
  FaShoppingCart,
  FaUsers,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

const Sidebar = ({ formData, setIslogin, islogin, search }) => {
  const [open, setOpen] = useState(false);

  const logout = () => {
    Cookies.remove("Token");

    console.log("remove token");
    setIslogin(false);
  };
  const navigate = useNavigate();
  const location = useLocation();
  const menuClass = (path) => {
    return location.pathname === path
      ? "bg-[#E8521A] text-white p-3 rounded-lg flex items-center gap-2"
      : "p-3 flex items-center gap-2";
  };

  return (
    <>
      <div className="menu-icon">
        <FaBars onClick={() => setOpen(true)} />
      </div>

      {open && <div className="overlay" onClick={() => setOpen(false)}></div>}
      <div className={open ? "side-bar active" : "side-bar"}>
        <div>
          <h1>E-Shop Admin</h1>
        </div>
        <div>
          <div onClick={() => navigate("/")} className={menuClass("/")}>
            <FaTachometerAlt className="" />
            <h3>Dashboard</h3>
          </div>
          <div
            onClick={() => navigate("/products")}
            className={menuClass("/products")}
          >
            <FaBox />
            <h3>Products</h3>
          </div>
          <div
            onClick={() => navigate("/categories")}
            className={menuClass("/categories")}
          >
            <FaList />
            <h3>Categories</h3>
          </div>
          <div
            onClick={() => navigate("/brands")}
            className={menuClass("/brands")}
          >
            <FaTag />
            <h3>Brands</h3>
          </div>
          <div
            onClick={() => navigate("/orders")}
            className={menuClass("/orders")}
          >
            <FaShoppingCart />
            <h3>Orders</h3>
          </div>
          <div
            onClick={() => navigate("/customers")}
            className={menuClass("/customers")}
          >
            <FaUsers />
            <h3>Customers</h3>
          </div>
          <div
            onClick={() => navigate("/analytics")}
            className={menuClass("/analytics")}
          >
            <FaChartBar />
            <h3>Analytics</h3>
          </div>
          <div
            onClick={() => navigate("/setting")}
            className={menuClass("/setting")}
          >
            <FaCog />
            <h3>Setting</h3>
          </div>
        </div>
        <div onClick={logout} className="logout">
          <FaSignOutAlt />
          <h3>logout</h3>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
