import React, { useState, useEffect } from "react";
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
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";

const Sidebar = ({ 
  formData, 
  setIslogin, 
  islogin, 
  search, 
  setSearch,
  isOpen,
  onClose 
}) => {
  const isDesktop = typeof window !== 'undefined' && window.innerWidth > 1024;
  const shouldShow = isDesktop || isOpen;

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
      {shouldShow && !isDesktop && <div className="overlay" onClick={onClose}></div>}
      <div className={`side-bar ${shouldShow ? 'active' : ''}`}>
        <div className="sidebar-header">
          <h1>E-Shop Admin</h1>
          {!isDesktop && (
            <button className="sidebar-close-btn" onClick={onClose} aria-label="Close sidebar">
              <FaTimes size={24} />
            </button>
          )}
        </div>

        <div className="sidebar-menu">
          <div onClick={() => { navigate("/"); onClose(); }} className={menuClass("/")}>
            <FaTachometerAlt className="" />
            <h3>Dashboard</h3>
          </div>
          <div
            onClick={() => { navigate("/products"); onClose(); }}
            className={menuClass("/products")}
          >
            <FaBox />
            <h3>Products</h3>
          </div>
          <div
            onClick={() => { navigate("/categories"); onClose(); }}
            className={menuClass("/categories")}
          >
            <FaList />
            <h3>Categories</h3>
          </div>
          <div
            onClick={() => { navigate("/brands"); onClose(); }}
            className={menuClass("/brands")}
          >
            <FaTag />
            <h3>Brands</h3>
          </div>
          <div
            onClick={() => { navigate("/orders"); onClose(); }}
            className={menuClass("/orders")}
          >
            <FaShoppingCart />
            <h3>Orders</h3>
          </div>
          <div
            onClick={() => { navigate("/customers"); onClose(); }}
            className={menuClass("/customers")}
          >
            <FaUsers />
            <h3>Customers</h3>
          </div>
          <div
            onClick={() => { navigate("/analytics"); onClose(); }}
            className={menuClass("/analytics")}
          >
            <FaChartBar />
            <h3>Analytics</h3>
          </div>
          <div
            onClick={() => { navigate("/setting"); onClose(); }}
            className={menuClass("/setting")}
          >
            <FaCog />
            <h3>Setting</h3>
          </div>
        </div>

        {/* Profile at end, above logout - mobile only */}
        {!isDesktop && (
          <div className="sidebar-profile mobile-only">
            <div className="sidebar-user-info" onClick={() => { onClose(); }}>
              <div className="userimg">
                <FaUserCircle />
              </div>
              <div className="userdetails">
                <h6>kapil</h6>
                <p>{formData?.Email || ""}</p>
              </div>
            </div>
          </div>
        )}

        <div onClick={logout} className="logout">
          <FaSignOutAlt />
          <h3>logout</h3>
        </div>
      </div>
    </>
  );
};

export default Sidebar;