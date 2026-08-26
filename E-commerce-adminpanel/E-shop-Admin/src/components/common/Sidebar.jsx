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
  FaBell,
  FaSun,
  FaMoon,
  FaSearch,
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
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

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

        {!isDesktop && (
          <div className="sidebar-mobile-content">
            <div className="sidebar-search">
              <FaSearch className="text-[#717182]" />
              <input
                type="text"
                placeholder="Search products, orders, customers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none w-full"
              />
            </div>

            <div className="sidebar-user-info" onClick={() => { /* handle profile click */ onClose(); }}>
              <div className="userimg">
                <FaUserCircle />
              </div>
              <div className="userdetails">
                <h6>kapil</h6>
                <p>{formData?.Email || ""}</p>
              </div>
            </div>

            <div className="sidebar-actions">
              <button onClick={() => setDark(!dark)} className="cursor-pointer text-xl">
                {dark ? <FaMoon /> : <FaSun />}
              </button>
              <button onClick={logout} className="logout-btn">
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>

            <div className="sidebar-notification">
              <FaBell />
            </div>
          </div>
        )}

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
        
        <div onClick={logout} className="logout desktop-only">
          <FaSignOutAlt />
          <h3>logout</h3>
        </div>
      </div>
    </>
  );
};

export default Sidebar;